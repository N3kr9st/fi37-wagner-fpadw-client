import React, { useEffect, useState } from 'react';
import RecipeComments from './Comments';
import AddComment from './AddComent';



const RecipeList = ({isLoggedIn}) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);

  const handleCommentAdded = () => {
  setCommentAdded(prev => !prev);
};


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://api-test.mshome.net:3001/recipe');
        if (!response.ok) throw new Error('Netzwerkantwort war nicht ok');
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error('Fehler beim Abrufen:', err);
        setError('Fehler beim Laden der Rezeptdaten');
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.recipeTitle?.toLowerCase().includes(search.toLowerCase())
  );


  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setSelectedRecipe(null);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4">Rezeptliste</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Rezepttitel suchen..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filteredRecipes.length === 0 ? (
        <p className="text-muted">Keine passenden Rezepte gefunden.</p>
      ) : (
        <ul className="list-group">
          {filteredRecipes.map(recipe => (
            <li
              key={recipe.recipeID}
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedRecipe(recipe)}
            >
              {recipe.recipeTitle}
            </li>
          ))}
        </ul>
      )}


      {selectedRecipe && (
        <div
          className="overlay"
          onClick={handleOverlayClick}
          style={overlayStyles}
        >
          <div className="card p-4" style={modalStyles}>
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Schließen"
              onClick={() => setSelectedRecipe(null)}
            ></button>
            <h3>{selectedRecipe.recipeTitle}</h3>
            <p><img
              src={selectedRecipe.imagePath
                ? `http://api-test.mshome.net:3001/${selectedRecipe.imagePath.replace(/\\/g, '/')}`
                : 'http://api-test.mshome.net:3001/default_Image/default.png'}
              style={{ maxWidth: '250px', width: '100%', height: 'auto' }}
              alt="Rezeptbild"
            /></p>
            <p><strong>Zubereitung:</strong> {selectedRecipe.zubereitung}</p>
            <div>
              <strong>Zutaten:</strong>
              <ul>
                {selectedRecipe.zutaten?.split(',').map((zutat, i) => (
                  <li key={i}>{zutat.trim()}</li>
                ))}
              </ul>
              <RecipeComments recipeID={selectedRecipe.recipeID} commentAdded={commentAdded}  />
              {isLoggedIn && <AddComment recipeID={selectedRecipe.recipeID} userID={selectedRecipe.userID} isLoggedIn={isLoggedIn}   onCommentAdded={handleCommentAdded} />}
            </div>
          </div>
        </div>
      )}


      <style>{`
        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease forwards;
          z-index: 1050;
        }

        .card {
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          animation: slideDown 0.3s ease forwards;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
        }

        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes slideDown {
          from {transform: translateY(-20px); opacity: 0;}
          to {transform: translateY(0); opacity: 1;}
        }
      `}</style>
    </div>
  );
};


const overlayStyles = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1050,
  animation: 'fadeIn 0.3s ease forwards',
};

const modalStyles = {
  maxWidth: '500px',
  width: '90%',
  maxHeight: '80vh',
  overflowY: 'auto',
  position: 'relative',
  animation: 'slideDown 0.3s ease forwards',
  boxShadow: '0 0 15px rgba(0,0,0,0.3)',
};

export default RecipeList;
