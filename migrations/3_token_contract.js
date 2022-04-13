const TokenGenerator = artifacts.require("./TokenGenerator.sol");
const FANTOKEN = artifacts.require("./FANTOKEN.sol");
const FanTokenSale = artifacts.require("./FanTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenGenerator);
  deployer.deploy(FANTOKEN);
  deployer.deploy(FanTokenSale);
};