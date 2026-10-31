import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useWeb3 } from "../context/Web3Context";

export default function TradeToken() {
  const { contracts, account, connected } = useWeb3();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("Approving trade contract…");
    try {
      await contracts.token.methods.approve(contracts.trade.options.address, amount).send({ from: account });
      setMessage("Sending tokens…");
      await contracts.trade.methods.transfer(to, amount).send({ from: account });
      setMessage("Transfer complete.");
    } catch (err) {
      setMessage(err.message || "Trade failed.");
    } finally {
      setBusy(false);
    }
  };

  if (!connected) {
    return <div className="page-card">Connect a wallet first.</div>;
  }

  return (
    <div className="page-card">
      <h2 className="page-title">Trade FAN tokens</h2>
      <p>Approves the trade contract, then transfers FAN to another wallet.</p>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipient address</Form.Label>
          <Form.Control value={to} onChange={(e) => setTo(e.target.value)} required placeholder="0x…" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={busy}>
          {busy ? "Working…" : "Send tokens"}
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
