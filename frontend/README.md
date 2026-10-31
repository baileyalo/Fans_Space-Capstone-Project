# Fans Space frontend

The React UI is part of the full Fans Space dApp. For the recommended local workflow, see the project root README and use `npm run setup`, `npm run chain`, and `npm run local` from the project root.

To run only the UI after deploying contracts to the configured local network:

```bash
npm start
```

The frontend reads the contract addresses from the Truffle artifacts in `src/contracts`. The default RPC URL is `http://127.0.0.1:8545`; set `REACT_APP_RPC_URL` only when using a different local endpoint.
