const TokenGenerator = artifacts.require("./TokenGenerator.sol");
const FanTokenSale = artifacts.require("./FanTokenSale.sol");
const KycContract = artifacts.require("./KycContract.sol");
const TokenTrade = artifacts.require("./TokenTrade.sol");

require("dotenv").config({ path: "./.env" });

module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(TokenGenerator);
  await deployer.deploy(KycContract);  
  await deployer.deploy(TokenTrade);  
  await deployer.deploy(FanTokenSale, 1,addr[0], TokenGenerator.address, KycContract.address );

  let tokenInstance = await FanTokenSale.deployed();
 
};