 import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://api-test.mshome.net:3001/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error("Serverfehler beim Absenden des Kommentars");
      }

      const data = await response.json();
      setMessage("Kommentar erfolgreich gesendet!");
      setComment("");
    } catch (error) {
      setMessage("Fehler: " + error.message);
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <h3>Kommentar senden</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Label>Kommentar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Gib deinen Kommentar ein"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Senden
        </Button>
      </Form>
      {message && <Alert className="mt-3" variant="info">{message}</Alert>}
    </Container>
  );
};

export default CommentForm;