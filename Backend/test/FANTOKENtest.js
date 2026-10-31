const Token = artifacts.require("FANTOKEN");
const chai = require("./setupchai");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("FANTOKEN", (accounts) => {
  const [initialHolder, recipient] = accounts;
  const supply = "1000000";

  beforeEach(async () => {
    this.token = await Token.new("FAN Token", "FAN", 0, supply, initialHolder);
  });

  it("mints the full supply to the token owner", async () => {
    const totalSupply = await this.token.totalSupply();
    await expect(this.token.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    expect(totalSupply.toString()).to.equal(supply);
  });

  it("transfers tokens between accounts", async () => {
    const sendTokens = 1;
    const totalSupply = await this.token.totalSupply();
    await expect(this.token.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
    await expect(this.token.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(
      totalSupply.sub(new BN(sendTokens))
    );
    await expect(this.token.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("rejects transfers above the sender balance", async () => {
    const balance = await this.token.balanceOf(initialHolder);
    await expect(this.token.transfer(recipient, balance.add(new BN(1)))).to.eventually.be.rejected;
    await expect(this.token.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balance);
  });

  it("requires allowance for transferFrom", async () => {
    await expect(this.token.transferFrom(initialHolder, recipient, 10, { from: recipient })).to.eventually.be
      .rejected;
    await this.token.approve(recipient, 10, { from: initialHolder });
    await expect(this.token.transferFrom(initialHolder, recipient, 10, { from: recipient })).to.eventually.be
      .fulfilled;
    await expect(this.token.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(10));
  });
});
