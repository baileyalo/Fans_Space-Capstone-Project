import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Contact() {
  const [status, setStatus] = useState("Submit");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending…");
    const { name, email, body } = event.target.elements;
    try {
      const response = await fetch("https://submit-form.com/0wZE9uUu", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          message: body.value,
        }),
      });
      if (!response.ok) {
        throw new Error("Could not send message");
      }
      setMessage("Thanks — your message was sent.");
      event.target.reset();
    } catch (err) {
      setMessage(err.message || "Send failed.");
    } finally {
      setStatus("Submit");
    }
  };

  return (
    <div className="page-card">
      <h2 className="page-title">Contact us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Full name" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="you@example.com" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control name="body" as="textarea" rows={4} required />
        </Form.Group>
        <Button variant="success" type="submit">
          {status}
        </Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
