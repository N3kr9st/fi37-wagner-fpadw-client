import React, { useEffect, useState } from 'react';
import { Spinner, Alert, ListGroup } from 'react-bootstrap';

const RecipeComments = ({ recipeID ,commentAdded}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipeID) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://api-test.mshome.net:3001/comments?recipeID=${recipeID}`);
        if (!response.ok) {
          if (response.status === 404) {
            setComments([]);
            return;
          }
          throw new Error('Fehler beim Abrufen der Kommentare');
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [recipeID, commentAdded]);


  if (comments.length === 0) {
    return <Alert variant="info">Noch keine Kommentare vorhanden.</Alert>;
  }

  return (
    <div>
      <h5>Kommentare</h5>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <strong>{comment.username || 'Anonym'}:</strong> {comment.commentText}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RecipeComments;