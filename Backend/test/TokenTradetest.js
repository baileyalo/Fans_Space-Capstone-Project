const Token = artifacts.require("FANTOKEN");
const TokenTrade = artifacts.require("TokenTrade");
const TokenSale = artifacts.require("FanTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai");
const expect = chai.expect;

contract("TokenTrade", (accounts) => {
  const [deployer, buyer, counterparty] = accounts;

  it("moves FAN tokens after the sender approves the trade contract", async () => {
    const token = await Token.deployed();
    const sale = await TokenSale.deployed();
    const kyc = await KycContract.deployed();
    const trade = await TokenTrade.deployed();
    const amount = 5;

    await kyc.setKycCompleted(buyer, { from: deployer });
    await sale.buyTokens(buyer, { from: buyer, value: amount });

    await token.approve(trade.address, amount, { from: buyer });
    const receipt = await trade.transfer(counterparty, amount, { from: buyer });

    assert.equal(receipt.logs[0].event, "Transfer");
    assert.equal(receipt.logs[0].args.from, buyer);
    assert.equal(receipt.logs[0].args.to, counterparty);
    assert.equal(receipt.logs[0].args.amount.toNumber(), amount);

    expect((await token.balanceOf(counterparty)).toNumber()).to.equal(amount);
    await expect(trade.transfer(counterparty, amount, { from: buyer })).to.eventually.be.rejected;
  });
});
