import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';

const RecipeDetail = ({ handleSearch, setQuery }) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [query, setLocalQuery] = useState('');

  useEffect(() => {
    fetchRecipeDetails();
  }, [recipeId]);

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`https://fridge-craft-server.vercel.app/api/recipes/findById/${recipeId}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bg-DarkGreen py-20 gap-10 flex flex-col">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold text-white text-center">
          Recipe Search
        </h2>
        <SearchBar query={query} setQuery={setLocalQuery} handleSearch={handleSearch} />
      </div>

      <div className="lg:max-w-[1240px] mx-auto bg-white rounded shadow-md p-10 my-20 flex flex-col gap-10">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold">{recipe.recipeTitle}</h2>
        <img src={recipe.imageUrl} alt={recipe.recipeTitle} className="w-full h-[550px] object-cover rounded" />
        <div className="flex flex-col gap-5">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Overview</h3>
          <p className="text-lg">{recipe.recipeOverview}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Ingredients</h3>
          <ul className="list-disc pl-5 mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold">Instructions</h3>
          <p className="text-lg">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

