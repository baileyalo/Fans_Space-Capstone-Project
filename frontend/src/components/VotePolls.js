import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useWeb3 } from "../context/Web3Context";

export default function VotePolls() {
  const { contracts, account, connected } = useWeb3();
  const [polls, setPolls] = useState([]);
  const [message, setMessage] = useState("");

  const loadPolls = useCallback(async () => {
    if (!contracts) return;
    const count = Number(await contracts.polls.methods.pollCount().call());
    const items = [];
    for (let id = 1; id <= count; id += 1) {
      const poll = await contracts.polls.methods.getPoll(id).call();
      items.push({
        id,
        team: poll.team,
        question: poll.question,
        options: poll.options,
        voteCounts: poll.voteCounts,
        open: poll.open,
      });
    }
    setPolls(items);
  }, [contracts]);

  useEffect(() => {
    loadPolls().catch((err) => setMessage(err.message || "Could not load polls."));
  }, [loadPolls]);

  const vote = async (pollId, option) => {
    setMessage("");
    try {
      await contracts.polls.methods.vote(pollId, option).send({ from: account });
      setMessage("Vote recorded.");
      await loadPolls();
    } catch (err) {
      setMessage(err.message || "Vote failed. You must hold FAN tokens and vote once per poll.");
    }
  };

  if (!connected) {
    return <div className="page-card">Connect a wallet first.</div>;
  }

  return (
    <div className="page-card">
      <h1>Team polls</h1>
      <p>Token holders can vote once per open poll.</p>
      {polls.length === 0 && <p>No polls yet.</p>}
      {polls.map((poll) => (
        <div key={poll.id} className="poll-item">
          <strong>
            #{poll.id} {poll.team}: {poll.question}
          </strong>
          <ul>
            {poll.options.map((option, index) => (
              <li key={option}>
                {option}: {poll.voteCounts[index]}{" "}
                {poll.open && (
                  <Button size="sm" variant="success" onClick={() => vote(poll.id, index)}>
                    Vote
                  </Button>
                )}
              </li>
            ))}
          </ul>
          {!poll.open && <em>Closed</em>}
        </div>
      ))}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
