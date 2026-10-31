import Web3 from "web3";

const localRpc = process.env.REACT_APP_RPC_URL || "http://127.0.0.1:8545";

export default async function getWeb3() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return web3;
  }

  if (window.web3) {
    return window.web3;
  }

  return new Web3(new Web3.providers.HttpProvider(localRpc));
}
