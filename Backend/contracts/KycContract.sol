// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
    mapping(address => bool) private allowed;

    event KycCompleted(address indexed account);
    event KycRevoked(address indexed account);

    function setKycCompleted(address account) public onlyOwner {
        require(account != address(0), "zero address");
        allowed[account] = true;
        emit KycCompleted(account);
    }

    function setKycRevoked(address account) public onlyOwner {
        require(account != address(0), "zero address");
        allowed[account] = false;
        emit KycRevoked(account);
    }

    function kycCompleted(address account) public view returns (bool) {
        return allowed[account];
    }
}
