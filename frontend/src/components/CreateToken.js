import React, { useCallback, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useWeb3 } from "../context/Web3Context";

export default function CreateToken() {
  const { contracts, account, connected } = useWeb3();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("0");
  const [totalSupply, setTotalSupply] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [created, setCreated] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const refresh = useCallback(async () => {
    if (!contracts) return;
    const list = await contracts.generator.methods.getAllAddresses().call();
    setAddresses(list);
  }, [contracts]);

  useEffect(() => {
    refresh().catch((err) => setMessage(err.message || "Could not load created tokens."));
  }, [refresh]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("Creating token…");
    try {
      const receipt = await contracts.generator.methods
        .generateToken(name, symbol, Number(decimals), totalSupply)
        .send({ from: account });
      const tokenAddress =
        receipt.events?.TokenCreated?.returnValues?.token ||
        (await contracts.generator.methods.getAllAddresses().call()).slice(-1)[0];
      setCreated(tokenAddress);
      setMessage("Token created.");
      await refresh();
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Token creation failed.");
    } finally {
      setBusy(false);
    }
  };

  if (!connected) {
    return <div className="page-card">Connect a wallet first.</div>;
  }

  return (
    <div className="page-card">
      <h1>Create team token</h1>
      <p>Deploys a new ERC-20 from TokenGenerator. You become the token owner.</p>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Token name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} required placeholder="Raptors Fan Token" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Symbol</Form.Label>
          <Form.Control value={symbol} onChange={(e) => setSymbol(e.target.value)} required placeholder="RFT" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Decimals</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="18"
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Total supply</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            required
            placeholder="1000000"
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={busy}>
          {busy ? "Submitting…" : "Create token"}
        </Button>
      </Form>
      {busy && <Spinner animation="border" variant="success" className="mt-3" />}
      {message && <p className="mt-3">{message}</p>}
      {created && (
        <p>
          Latest token: <code>{created}</code>
        </p>
      )}
      {addresses.length > 0 && (
        <div className="mt-3">
          <h3>Created tokens</h3>
          <ul>
            {addresses.map((addr) => (
              <li key={addr}>
                <code>{addr}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
