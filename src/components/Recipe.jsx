import React, { useEffect, useState } from 'react';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://api-test.mshome.net:3001/recipe');
        if (!response.ok) {
          throw new Error('Netzwerkantwort war nicht ok');
        }
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
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRecipes.length === 0 ? (
        <p className="text-muted">Keine passenden Rezepte gefunden.</p>
      ) : (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.recipeID} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{recipe.recipeTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">User ID: {recipe.userID}</h6>

                  <p className="card-text"><strong>Zubereitung:</strong><br />{recipe.zubereitung}</p>

                  <strong>Zutaten:</strong>
                  <ul className="mt-2">
                    {recipe.zutaten?.split(',').map((zutat, index) => (
                      <li key={index}>{zutat.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
