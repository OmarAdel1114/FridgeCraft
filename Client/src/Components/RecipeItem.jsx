import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Favorites from './FavoritesPage'

import { useAppContext } from './context/appContext';



const RecipeItem = ({ recipe }) => {

  
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  console.log("the favorites are ", favorites);

  const favoritesChecker =(id) => {
    const boolean = favorites.some((recipe) => recipe._id ===id);

    return boolean;
  }

 


  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };


  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <img src={recipe.imageUrl} alt={recipe.recipeTitle} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col gap-5 justify-between">
        <h5 className="lg:text-2xl md:text-xl text-lg font-semibold">{recipe.recipeTitle}</h5>
        <p>{truncateText(recipe.recipeOverview, 14)}</p>
        <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
          <button className="rounded border border-DarkGreen bg-DarkGreen py-3 px-8 text-base font-medium  leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
            View Recipe
          </button>
        </Link>
        <Link to={Favorites}>
        <div>
            {favoritesChecker(recipe._id) ? (
            
            <button onClick={() => removeFromFavorites(recipe._id)} className='p-[10px] bg-LightGreen text-black w-full rounded-md'>
              Remove From Favorites
              </button>

            )
            
           : (<button onClick={() => addToFavorites(recipe)} className='p-[10px] bg-DarkGreen text-white w-full rounded-md'>
           Add to favorites
           </button>
         ) }
            
          </div>
          </Link>
      </div>
      

      

    </div>
  );
};

export default RecipeItem;
