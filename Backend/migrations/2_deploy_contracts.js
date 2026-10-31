const FANTOKEN = artifacts.require("FANTOKEN");
const FanTokenSale = artifacts.require("FanTokenSale");
const KycContract = artifacts.require("KycContract");
const TokenGenerator = artifacts.require("TokenGenerator");
const TokenTrade = artifacts.require("TokenTrade");
const FanPoll = artifacts.require("FanPoll");

require("dotenv").config();

module.exports = async function (deployer, _network, accounts) {
  const [deployerAccount] = accounts;
  const initialTokens = process.env.INITIAL_TOKENS || "1000000";

  await deployer.deploy(FANTOKEN, "FAN Token", "FAN", 0, initialTokens, deployerAccount);
  const token = await FANTOKEN.deployed();

  await deployer.deploy(KycContract);
  await deployer.deploy(FanTokenSale, 1, deployerAccount, token.address, KycContract.address);
  await deployer.deploy(TokenGenerator);
  await deployer.deploy(TokenTrade, token.address);
  await deployer.deploy(FanPoll, token.address);

  const totalSupply = await token.totalSupply();
  await token.transfer(FanTokenSale.address, totalSupply);
};
