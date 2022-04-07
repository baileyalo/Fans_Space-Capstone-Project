// SPDX-License-Identifier: MIT


pragma solidity 0.8.13;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Storage.sol";

contract TestStorage {

  function testItStoresAValue() public {
    Storage storage = Storage(DeployedAddresses.Storage());

    storage.set(59);

    uint expected = 59;

    Assert.equal(storage.get(), expected, "It should store the value 59.");
  }

}