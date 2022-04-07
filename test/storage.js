const Storage = artifacts.require("./Storage.sol");

contract("Storage", accounts => {
  it("...should store the value 59.", async () => {
    const StorageInstance = await Storage.deployed();

    // Set value of 89
    await StorageInstance.set(59, { from: accounts[0] });

    // Get stored value
    const storedData = await StorageInstance.get.call();

    assert.equal(storedData, 59, "The value 89 was not stored.");
  });
});