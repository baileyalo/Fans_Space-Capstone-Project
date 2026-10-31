// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenTrade {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(IERC20 token_) {
        require(address(token_) != address(0), "token is zero address");
        token = token_;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "recipient is zero address");
        require(amount > 0, "amount must be > 0");
        token.safeTransferFrom(msg.sender, to, amount);
        emit Transfer(msg.sender, to, amount);
        return true;
    }
}
