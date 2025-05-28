import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState(['']);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientString = ingredients.filter(i => i.trim() !== '').join(', ');

    const payload = {
      name: recipeName,
      preparation: instructions,
      ingredients: ingredientString,
    };

    try {
      const response = await fetch('http://api-test.mshome.net:3001/addRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Rezept erfolgreich gesendet!');
        setRecipeName('');
        setInstructions('');
        setIngredients(['']);
      } else {
        alert('Fehler beim Senden des Rezepts.');
      }
    } catch (error) {
      alert('Netzwerkfehler: ' + error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Rezept erstellen</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Rezeptname</Form.Label>
          <Form.Control
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zubereitung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Label>Zutaten</Form.Label>
        {ingredients.map((ingredient, index) => (
          <Row key={index} className="mb-2">
            <Col xs={10}>
              <Form.Control
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
            </Col>
            <Col xs={2}>
              <Button
                variant="danger"
                onClick={() => removeIngredient(index)}
                disabled={ingredients.length === 1}
              >
                Entfernen
              </Button>
            </Col>
          </Row>
        ))}

        <Button variant="secondary" onClick={addIngredient} className="mb-3">
          Weitere Zutat hinzufügen
        </Button>

        <div>
          <Button variant="primary" type="submit">
            Rezept absenden
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default RecipeForm;
