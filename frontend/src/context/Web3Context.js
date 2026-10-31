import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import getWeb3 from "../web3/getWeb3";
import { loadContracts } from "../web3/contracts";

const Web3Context = createContext(null);

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [networkId, setNetworkId] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [isTeam, setIsTeam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hydrate = useCallback(async (instance) => {
    const accounts = await instance.eth.getAccounts();
    const id = await instance.eth.net.getId();
    const loaded = loadContracts(instance, id);
    const owner = await loaded.kyc.methods.owner().call();
    const current = accounts[0] || "";

    setWeb3(instance);
    setAccount(current);
    setNetworkId(id);
    setContracts(loaded);
    setIsTeam(current && owner && current.toLowerCase() === owner.toLowerCase());
    setError("");
  }, []);

  const connectWallet = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const instance = await getWeb3();
      await hydrate(instance);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect wallet or load contracts.");
    } finally {
      setLoading(false);
    }
  }, [hydrate]);

  useEffect(() => {
    if (!window.ethereum) {
      return undefined;
    }

    const onAccountsChanged = () => {
      if (web3) {
        hydrate(web3);
      }
    };
    const onChainChanged = () => window.location.reload();

    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged", onChainChanged);
    };
  }, [web3, hydrate]);

  const value = useMemo(
    () => ({
      web3,
      account,
      networkId,
      contracts,
      isTeam,
      loading,
      error,
      connected: Boolean(account && contracts),
      connectWallet,
    }),
    [web3, account, networkId, contracts, isTeam, loading, error, connectWallet]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  const ctx = useContext(Web3Context);
  if (!ctx) {
    throw new Error("useWeb3 must be used inside Web3Provider");
  }
  return ctx;
}
