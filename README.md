# Fans Space

Fans Space is an Ethereum dApp for sports teams and fans. Teams issue fan tokens, whitelist buyers (KYC), run polls, and let holders transfer tokens.

## Stack

- Solidity 0.8.13 and OpenZeppelin 4.x
- Truffle and Ganache
- React (Create React App), MetaMask, and `web3.js`

## Run locally

Prerequisites: Node.js and npm. From the project root, install both the contract and frontend dependencies:

```bash
npm run setup
```

Start the local blockchain in one terminal:

```bash
npm run chain
```

In a second terminal, from the project root, deploy the contracts and start the frontend:

```bash
npm run local
```

The UI opens at [http://localhost:3000](http://localhost:3000). `npm run local` redeploys the contracts to the local chain each time; keep the chain terminal running while you use the app.

In MetaMask, add a local network with:

- **Network name:** Fans Space Local
- **RPC URL:** `http://127.0.0.1:8545`
- **Chain ID:** `1337`
- **Currency symbol:** `ETH`

Import the first account and its private key shown by Ganache as the team admin. Import another Ganache account as a fan. These deterministic accounts are for local development only; never use their keys on a live network or store real funds in them.

The local app uses the default RPC URL and does not require `.env` files. Optional overrides are documented in `Backend/.env.example` and `frontend/.env.example`.

## Typical fan flow

1. Connect the team admin wallet and go to **Buy** to whitelist the fan's address.
2. Connect the fan wallet and buy tokens. The default deployment uses 0 decimals and a rate of 1 token unit per wei.
3. Use **Vote** to vote in open polls or **Trade** to transfer tokens to another wallet (approve, then transfer).

## Contracts

| Contract | Role |
| --- | --- |
| `FANTOKEN` | ERC-20 fan token |
| `FanTokenSale` | Crowdsale; buyer must pass KYC |
| `KycContract` | Owner-only whitelist |
| `TokenGenerator` | Factory for additional team tokens |
| `TokenTrade` | P2P transfer via `transferFrom` |
| `FanPoll` | Token-gated polls (one vote per address) |

## Tests

Start the local chain with `npm run chain`, then run in another terminal:

```bash
npm test
```

## Sepolia testnet

Rinkeby is shut down. For Sepolia, set `MNEMONIC` and `RPC_URL` in `Backend/.env` (never commit these values), then deploy with:

```bash
npm --prefix Backend run migrate:sepolia
```

Switch MetaMask to Sepolia before using the UI. Do not put mnemonics, private keys, or RPC keys in source code or `REACT_APP_*` variables.
