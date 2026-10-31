const Token = artifacts.require("FANTOKEN");
const FanPoll = artifacts.require("FanPoll");
const TokenSale = artifacts.require("FanTokenSale");
const KycContract = artifacts.require("KycContract");

contract("FanPoll", (accounts) => {
  const [deployer, voter, outsider] = accounts;

  it("creates a poll and accepts one vote from a token holder", async () => {
    const token = await Token.deployed();
    const sale = await TokenSale.deployed();
    const kyc = await KycContract.deployed();
    const polls = await FanPoll.deployed();

    await kyc.setKycCompleted(voter, { from: deployer });
    await sale.buyTokens(voter, { from: voter, value: 1 });

    const idBn = await polls.createPoll("Raptors", "Next captain?", ["A", "B"], { from: deployer });
    const pollId = idBn.logs[0].args.id;

    await polls.vote(pollId, 1, { from: voter });
    try {
      await polls.vote(pollId, 0, { from: voter });
      assert.fail("second vote should revert");
    } catch (err) {
      assert(err.message.includes("already voted"));
    }

    try {
      await polls.vote(pollId, 0, { from: outsider });
      assert.fail("non-holder should revert");
    } catch (err) {
      assert(err.message.includes("must hold fan tokens"));
    }

    const result = await polls.getPoll(pollId);
    assert.equal(result.team, "Raptors");
    assert.equal(result.voteCounts[1].toNumber(), 1);
  });
});
