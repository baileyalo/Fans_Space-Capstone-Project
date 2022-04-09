// SPDX-License-Identifier: MIT


pragma solidity 0.6.10;

contract Storage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}