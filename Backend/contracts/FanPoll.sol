// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FanPoll is Ownable {
    IERC20 public immutable token;

    struct Poll {
        string team;
        string question;
        string[] options;
        mapping(uint256 => uint256) votes;
        mapping(address => bool) hasVoted;
        bool exists;
        bool open;
        address creator;
    }

    uint256 public pollCount;
    mapping(uint256 => Poll) private polls;

    event PollCreated(uint256 indexed id, string team, string question, address indexed creator);
    event Voted(uint256 indexed id, address indexed voter, uint256 option);
    event PollClosed(uint256 indexed id);

    constructor(IERC20 token_) {
        require(address(token_) != address(0), "token is zero address");
        token = token_;
    }

    function createPoll(
        string memory team,
        string memory question,
        string[] memory options
    ) external onlyOwner returns (uint256) {
        require(bytes(team).length > 0 && bytes(question).length > 0, "team and question required");
        require(options.length >= 2, "at least two options required");

        pollCount += 1;
        Poll storage poll = polls[pollCount];
        poll.team = team;
        poll.question = question;
        poll.options = options;
        poll.exists = true;
        poll.open = true;
        poll.creator = msg.sender;

        emit PollCreated(pollCount, team, question, msg.sender);
        return pollCount;
    }

    function vote(uint256 pollId, uint256 option) external {
        Poll storage poll = polls[pollId];
        require(poll.exists && poll.open, "poll is not open");
        require(option < poll.options.length, "invalid option");
        require(!poll.hasVoted[msg.sender], "already voted");
        require(token.balanceOf(msg.sender) > 0, "must hold fan tokens");

        poll.hasVoted[msg.sender] = true;
        poll.votes[option] += 1;
        emit Voted(pollId, msg.sender, option);
    }

    function closePoll(uint256 pollId) external {
        Poll storage poll = polls[pollId];
        require(poll.exists, "unknown poll");
        require(msg.sender == poll.creator, "only creator can close");
        poll.open = false;
        emit PollClosed(pollId);
    }

    function getPoll(uint256 pollId)
        external
        view
        returns (
            string memory team,
            string memory question,
            string[] memory options,
            uint256[] memory voteCounts,
            bool open,
            address creator
        )
    {
        Poll storage poll = polls[pollId];
        require(poll.exists, "unknown poll");

        uint256[] memory counts = new uint256[](poll.options.length);
        for (uint256 i = 0; i < poll.options.length; i++) {
            counts[i] = poll.votes[i];
        }

        return (poll.team, poll.question, poll.options, counts, poll.open, poll.creator);
    }
}
