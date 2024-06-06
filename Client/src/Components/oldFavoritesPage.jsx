
/*import React from 'react'

import { useAppContext } from './context/appContext';

const Favorites = () => {

  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  console.log("the favorites are ", favorites);

  const favoritesChecker =(id) => {
    const boolean = favorites.some((recipe) => recipe._id ===id);

    return boolean;
  }

  return (
    
    <div className='min-h-[80vh] w-full grid grid-cols-3 justify-items-center'>
      
      {favorites.length > 0 ? favorites.map((recipe) => (
        <div key={recipe._id} className='text-center flex flex-col items-center justify-center'>
          <div><h4>{recipe.recipeTitle}</h4></div>
          <div>
            <img src={recipe.imageUrl} alt={recipe.recipeTitle} className='w-[300px] h-[300px] transition-all duration-300 ease-in-out hover:scale-110' />
          </div>
          <div>
            {favoritesChecker(recipe._id) ? (
            
            <button onClick={() => removeFromFavorites(recipe._id)} className='p-[10px] bg-black text-white w-full rounded-md'>
              Remove From Favorites
              </button>

            )
            
           : (<button onClick={() => addToFavorites(recipe)} className='p-[10px] bg-black text-white w-full rounded-md'>
           Add to favorites
           </button>
         ) }
            
          </div>
        </div>
      )) : <h1>you don't have any favorites</h1>}
      </div>
  )
}

export default Favorites*/ 
import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch saved recipes from the backend
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch('https://fridge-craft-server.vercel.app/api/savedRecipes/${userId}');
        if (response.ok) {
          const data = await response.json();
          setSavedRecipes(data);
        } else {
          console.error('Failed to fetch saved recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch saved recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Load favorites from local storage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites([...favorites, recipe]);
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(recipe => recipe._id !== recipeId));
  };

  const favoritesChecker = (recipeId) => {
    return favorites.some(favorite => favorite._id === recipeId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-[80vh] w-full grid grid-cols-3 justify-items-center'>
      {savedRecipes.length > 0 ? savedRecipes.map((recipe) => (
        <div key={recipe._id} className='text-center flex flex-col items-center justify-center'>
          <div><h4>{recipe.recipeTitle}</h4></div>
          <div>
            <img src={recipe.imageUrl} alt={recipe.recipeTitle} className='w-[300px] h-[300px] transition-all duration-300 ease-in-out hover:scale-110' />
          </div>
          <div>
            {favoritesChecker(recipe._id) ? (
              <button onClick={() => removeFromFavorites(recipe._id)} className='p-[10px] bg-black text-white w-full rounded-md'>
                Remove From Favorites
              </button>
            ) : (
              <button onClick={() => addToFavorites(recipe)} className='p-[10px] bg-black text-white w-full rounded-md'>
                Add to favorites
              </button>
            )}
          </div>
        </div>
      )) : <h1>You don't have any favorites</h1>}
    </div>
  );
};

export default Favorites;
