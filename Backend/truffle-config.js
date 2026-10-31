const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mnemonic = process.env.MNEMONIC;
const rpcUrl = process.env.RPC_URL;

module.exports = {
  contracts_build_directory: path.join(__dirname, "../frontend/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    sepolia: {
      provider: () => {
        if (!mnemonic || !rpcUrl) {
          throw new Error("Set MNEMONIC and RPC_URL in Backend/.env for Sepolia");
        }
        return new HDWalletProvider({
          mnemonic: { phrase: mnemonic },
          providerOrUrl: rpcUrl,
        });
      },
      network_id: 11155111,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      confirmations: 2,
      skipDryRun: true,
    },
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.13",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
