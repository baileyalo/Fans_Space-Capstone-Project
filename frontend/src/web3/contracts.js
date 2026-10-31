import FANTOKEN from "../contracts/FANTOKEN.json";
import FanTokenSale from "../contracts/FanTokenSale.json";
import KycContract from "../contracts/KycContract.json";
import TokenGenerator from "../contracts/TokenGenerator.json";
import TokenTrade from "../contracts/TokenTrade.json";
import FanPoll from "../contracts/FanPoll.json";

function loadContract(web3, artifact, networkId) {
  const deployed = artifact.networks[networkId];
  if (!deployed || !deployed.address) {
    throw new Error(
      `${artifact.contractName} is not deployed on network ${networkId}. Run truffle migrate, then refresh.`
    );
  }
  return new web3.eth.Contract(artifact.abi, deployed.address);
}

export function loadContracts(web3, networkId) {
  return {
    token: loadContract(web3, FANTOKEN, networkId),
    sale: loadContract(web3, FanTokenSale, networkId),
    kyc: loadContract(web3, KycContract, networkId),
    generator: loadContract(web3, TokenGenerator, networkId),
    trade: loadContract(web3, TokenTrade, networkId),
    polls: loadContract(web3, FanPoll, networkId),
  };
}
