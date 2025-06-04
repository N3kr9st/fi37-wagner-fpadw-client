import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [image, setImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('Bild darf maximal 5MB groß sein.');
      return;
    }
    if (file && !file.type.startsWith('image/')) {
      alert('Nur Bilddateien sind erlaubt.');
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', recipeName);
    formData.append('preparation', instructions);
    formData.append('ingredients', ingredients.filter(i => i.trim() !== '').join(', '));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://api-test.mshome.net:3001/addRecipe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Rezept erfolgreich gesendet!');
        setRecipeName('');
        setInstructions('');
        setIngredients(['']);
        setImage(null);
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
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <Form.Group className="mb-3">
          <Form.Label>Bild hochladen (max. 5MB)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

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
