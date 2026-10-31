import React, { useCallback, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useWeb3 } from "../context/Web3Context";

export default function CreatePolls() {
  const { contracts, account, connected } = useWeb3();
  const [team, setTeam] = useState("");
  const [question, setQuestion] = useState("");
  const [optionsText, setOptionsText] = useState("Yes\nNo");
  const [polls, setPolls] = useState([]);
  const [busy, setBusy] = useState(false);
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const options = optionsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (options.length < 2) {
      setMessage("Enter at least two options, one per line.");
      return;
    }
    setBusy(true);
    setMessage("Creating poll…");
    try {
      await contracts.polls.methods.createPoll(team, question, options).send({ from: account });
      setMessage("Poll created.");
      await loadPolls();
    } catch (err) {
      setMessage(err.message || "Could not create poll.");
    } finally {
      setBusy(false);
    }
  };

  const closePoll = async (id) => {
    try {
      await contracts.polls.methods.closePoll(id).send({ from: account });
      await loadPolls();
    } catch (err) {
      setMessage(err.message || "Could not close poll.");
    }
  };

  if (!connected) {
    return <div className="page-card">Connect a wallet first.</div>;
  }

  return (
    <div className="page-card">
      <h1>Create poll</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Sports team</Form.Label>
          <Form.Control value={team} onChange={(e) => setTeam(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Options (one per line)</Form.Label>
          <Form.Control as="textarea" rows={4} value={optionsText} onChange={(e) => setOptionsText(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={busy}>
          Create poll
        </Button>
      </Form>
      {busy && <Spinner animation="border" variant="success" className="mt-3" />}
      {message && <p className="mt-3">{message}</p>}
      <h2 className="mt-4">Existing polls</h2>
      {polls.map((poll) => (
        <div key={poll.id} className="poll-item">
          <strong>
            #{poll.id} {poll.team}: {poll.question}
          </strong>
          <ul>
            {poll.options.map((option, index) => (
              <li key={option}>
                {option}: {poll.voteCounts[index]}
              </li>
            ))}
          </ul>
          {poll.open ? (
            <Button size="sm" variant="outline-success" onClick={() => closePoll(poll.id)}>
              Close
            </Button>
          ) : (
            <em>Closed</em>
          )}
        </div>
      ))}
    </div>
  );
}
