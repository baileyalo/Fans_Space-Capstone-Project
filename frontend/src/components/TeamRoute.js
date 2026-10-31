import React from "react";
import { Navigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";

export default function TeamRoute({ children }) {
  const { connected, isTeam, loading } = useWeb3();

  if (loading) {
    return <div className="page-card">Connecting wallet…</div>;
  }
  if (!connected) {
    return <Navigate to="/login" replace />;
  }
  if (!isTeam) {
    return (
      <div className="page-card">
        <h2>Team wallet required</h2>
        <p>This action is limited to the KYC contract owner (the team admin wallet used at deploy time).</p>
      </div>
    );
  }
  return children;
}
