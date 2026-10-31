import React from "react";
import Button from "react-bootstrap/Button";
import { useWeb3 } from "../context/Web3Context";

export default function Login() {
  const { connectWallet, account, isTeam, loading, error, connected } = useWeb3();

  return (
    <div className="page-card">
      <h2 className="page-title">Connect wallet</h2>
      <p>Use MetaMask on the same network where you deployed the contracts (Ganache or Sepolia).</p>
      <Button variant="success" onClick={connectWallet} disabled={loading}>
        {loading ? "Connecting…" : connected ? "Reconnect" : "Connect MetaMask"}
      </Button>
      {error && <p className="error-text">{error}</p>}
      {connected && (
        <div className="wallet-status">
          <p>
            <strong>Account:</strong> {account}
          </p>
          <p>
            <strong>Role:</strong> {isTeam ? "Team admin" : "Fan"}
          </p>
        </div>
      )}
    </div>
  );
}
