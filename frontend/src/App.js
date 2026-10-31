import React from "react";
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useWeb3 } from "./context/Web3Context";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import CreateToken from "./components/CreateToken";
import BuyToken from "./components/BuyToken";
import CreatePolls from "./components/CreatePolls";
import TradeToken from "./components/TradeToken";
import VotePolls from "./components/VotePolls";
import TeamRoute from "./components/TeamRoute";
import FanRoute from "./components/FanRoute";

function WalletBadge() {
  const { account, isTeam, connected, connectWallet, loading } = useWeb3();
  if (!connected) {
    return (
      <button type="button" className="wallet-btn" onClick={connectWallet} disabled={loading}>
        {loading ? "Connecting…" : "Connect"}
      </button>
    );
  }
  return (
    <span className="wallet-badge">
      {isTeam ? "Team" : "Fan"} · {account.slice(0, 6)}…{account.slice(-4)}
    </span>
  );
}

export default function App() {
  const { isTeam, connected } = useWeb3();

  return (
    <Router>
      <div className="app-shell">
        <h2 className="brand">Welcome to Fans Space</h2>
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Wallet
              </Link>
            </li>
            {connected && (
              <>
                <li>
                  <Link to="/buytoken" className="nav-link">
                    Buy
                  </Link>
                </li>
                <li>
                  <Link to="/tradetoken" className="nav-link">
                    Trade
                  </Link>
                </li>
                <li>
                  <Link to="/vote" className="nav-link">
                    Vote
                  </Link>
                </li>
              </>
            )}
            {isTeam && (
              <>
                <li>
                  <Link to="/createtoken" className="nav-link">
                    Create token
                  </Link>
                </li>
                <li>
                  <Link to="/createpoll" className="nav-link">
                    Create poll
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          <WalletBadge />
        </nav>
        <hr className="brand-rule" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/createtoken"
            element={
              <TeamRoute>
                <CreateToken />
              </TeamRoute>
            }
          />
          <Route
            path="/createpoll"
            element={
              <TeamRoute>
                <CreatePolls />
              </TeamRoute>
            }
          />
          <Route
            path="/buytoken"
            element={
              <FanRoute>
                <BuyToken />
              </FanRoute>
            }
          />
          <Route
            path="/tradetoken"
            element={
              <FanRoute>
                <TradeToken />
              </FanRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <FanRoute>
                <VotePolls />
              </FanRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
