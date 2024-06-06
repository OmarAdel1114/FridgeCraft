import React, { useEffect, useState } from 'react';
import { getSavedRecipes } from '../api/recipes';
import { useSelector } from 'react-redux';

function FavoritesPage({   }) {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { data } = useSelector((state) => state.auth);  
    const userId = data.data._id;

  console.log(`Sr`,savedRecipes) 

  async  function fetchSavedRecipes() {
    try {
        const recipes = await getSavedRecipes(userId); 
        console.log(`rrr`,recipes)
        setSavedRecipes(recipes);
    } catch (error) {
        console.error('Failed to fetch saved recipes', error);
    }
};  

useEffect(() => {
        fetchSavedRecipes();
    }, []);

    return (
        <div>
            <h1>Your Favorite Recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default FavoritesPage;