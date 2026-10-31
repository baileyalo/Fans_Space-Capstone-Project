// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./FANTOKEN.sol";

contract TokenGenerator {
    address[] public deployedTokensAddresses;

    event TokenCreated(
        address indexed token,
        string name,
        string symbol,
        uint8 decimals,
        uint256 supply,
        address indexed tokenOwner
    );

    function generateToken(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 supply_
    ) public returns (address) {
        require(bytes(name_).length > 0 && bytes(symbol_).length > 0, "name and symbol required");
        require(supply_ > 0, "supply must be > 0");

        FANTOKEN token = new FANTOKEN(name_, symbol_, decimals_, supply_, msg.sender);
        deployedTokensAddresses.push(address(token));
        emit TokenCreated(address(token), name_, symbol_, decimals_, supply_, msg.sender);
        return address(token);
    }

    function getAllAddresses() public view returns (address[] memory) {
        return deployedTokensAddresses;
    }
}
