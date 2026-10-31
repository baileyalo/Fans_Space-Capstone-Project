import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useWeb3 } from "../context/Web3Context";

export default function BuyToken() {
  const { web3, contracts, account, isTeam, connected } = useWeb3();
  const [kycAddress, setKycAddress] = useState("");
  const [userTokens, setUserTokens] = useState("0");
  const [saleAddress, setSaleAddress] = useState("");
  const [amountWei, setAmountWei] = useState("1");
  const [message, setMessage] = useState("");

  const refreshBalance = useCallback(async () => {
    if (!contracts || !account) return;
    const balance = await contracts.token.methods.balanceOf(account).call();
    setUserTokens(balance);
    setSaleAddress(contracts.sale.options.address);
  }, [contracts, account]);

  useEffect(() => {
    refreshBalance().catch(console.error);
  }, [refreshBalance]);

  useEffect(() => {
    if (!contracts || !account) return undefined;
    const sub = contracts.token.events.Transfer({ filter: { to: account } }).on("data", refreshBalance);
    return () => {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    };
  }, [contracts, account, refreshBalance]);

  const handleKyc = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await contracts.kyc.methods.setKycCompleted(kycAddress).send({ from: account });
      setMessage(`KYC completed for ${kycAddress}`);
    } catch (err) {
      setMessage(err.message || "KYC update failed. Only the team admin can whitelist.");
    }
  };

  const handleBuy = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await contracts.sale.methods.buyTokens(account).send({
        from: account,
        value: web3.utils.toWei(amountWei, "wei"),
      });
      setMessage("Purchase confirmed.");
      await refreshBalance();
    } catch (err) {
      setMessage(err.message || "Purchase failed. Complete KYC first.");
    }
  };

  if (!connected) {
    return <div className="page-card">Connect a wallet first.</div>;
  }

  return (
    <div className="page-card">
      <h1>FAN token sale</h1>
      <p>Sale contract: {saleAddress}</p>
      <p>You currently hold {userTokens} FAN tokens.</p>

      {isTeam && (
        <Form onSubmit={handleKyc} className="mb-4">
          <h2>Team: KYC whitelist</h2>
          <Form.Group className="mb-3">
            <Form.Label>Fan address</Form.Label>
            <Form.Control
              value={kycAddress}
              onChange={(e) => setKycAddress(e.target.value)}
              placeholder="0x…"
              required
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Add to whitelist
          </Button>
        </Form>
      )}

      <Form onSubmit={handleBuy}>
        <h2>Buy tokens</h2>
        <p>Rate: 1 wei buys 1 FAN (decimals = 0 in the default deploy).</p>
        <Form.Group className="mb-3">
          <Form.Label>Amount (wei)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={amountWei}
            onChange={(e) => setAmountWei(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Buy
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
