const Token = artifacts.require("FANTOKEN");
const TokenSale = artifacts.require("FanTokenSale");
const KycContract = artifacts.require("KycContract");

const chai = require("./setupchai");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("FanTokenSale", (accounts) => {
  const [deployerAccount, recipient] = accounts;

  it("holds no tokens in the deployer after migration", async () => {
    const instance = await Token.deployed();
    await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
  });

  it("holds the full supply in the sale contract", async () => {
    const instance = await Token.deployed();
    const saleBalance = await instance.balanceOf(TokenSale.address);
    const totalSupply = await instance.totalSupply();
    expect(saleBalance).to.be.a.bignumber.equal(totalSupply);
  });

  it("lets a KYC-approved buyer purchase tokens", async () => {
    const tokenInstance = await Token.deployed();
    const tokenSaleInstance = await TokenSale.deployed();
    const kycInstance = await KycContract.deployed();

    await kycInstance.setKycCompleted(recipient, { from: deployerAccount });
    const before = await tokenInstance.balanceOf(recipient);

    await expect(
      tokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") })
    ).to.eventually.be.fulfilled;

    await expect(tokenInstance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(before.add(new BN(1)));
  });
});
