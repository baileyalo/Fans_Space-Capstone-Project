const KycContract = artifacts.require("./KycContract.sol");
const Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function (deployer) {
  deployer.deploy(KycContract);
  deployer.deploy(Crowdsale);
};