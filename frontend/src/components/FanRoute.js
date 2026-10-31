import React from "react";
import { Navigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";

export default function FanRoute({ children }) {
  const { connected, loading } = useWeb3();

  if (loading) {
    return <div className="page-card">Connecting wallet…</div>;
  }
  if (!connected) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
