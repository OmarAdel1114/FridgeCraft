import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ recipe }) => {
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
          <button className="rounded border border-DarkGreen bg-DarkGreen py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
            View Recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;
