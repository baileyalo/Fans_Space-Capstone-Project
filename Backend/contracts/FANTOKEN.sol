// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FANTOKEN is ERC20, Ownable {
    uint8 private immutable _customDecimals;

    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 supply_,
        address tokenOwner
    ) ERC20(name_, symbol_) {
        require(tokenOwner != address(0), "owner is zero address");
        require(bytes(name_).length > 0 && bytes(symbol_).length > 0, "name and symbol required");
        require(supply_ > 0, "supply must be > 0");

        _customDecimals = decimals_;
        _mint(tokenOwner, supply_ * (10 ** uint256(decimals_)));
        _transferOwnership(tokenOwner);
    }

    function decimals() public view override returns (uint8) {
        return _customDecimals;
    }
}
