import React, { useState } from 'react';

const Recipe = ({ recipe, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onSave(recipe);
  };

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <p className="mb-4">{recipe.description}</p>
      <button
        className={`px-4 py-2 rounded ${
          isSaved ? 'bg-gray-500 text-gray-200' : 'bg-blue-500 text-white'
        }`}
        onClick={handleSave}
        disabled={isSaved}
      >
        {isSaved ? 'Saved' : 'Save Recipe'}
      </button>
    </div>
  );
};

const SavedRecipes = ({ savedRecipes }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Recipes</h2>
      {savedRecipes.map((recipe, index) => (
        <div key={index} className="border p-4 mb-4">
          <h3 className="text-lg font-bold mb-2">{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleSave = (recipe) => {
    setSavedRecipes([...savedRecipes, recipe]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe App</h1>
      <Recipe
        recipe={{ title: 'Pasta Carbonara', description: 'Delicious pasta with bacon and eggs' }}
        onSave={handleSave}
      />
      <Recipe
        recipe={{ title: 'Chocolate Cake', description: 'Decadent chocolate cake recipe' }}
        onSave={handleSave}
      />
      <SavedRecipes savedRecipes={savedRecipes} />
    </div>
  );
};

export default App;
