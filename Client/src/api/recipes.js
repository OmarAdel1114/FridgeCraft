// src/api/recipes.js

// src/api/recipes.js

export async function addRecipeToFavorites(recipeId, userId, token) {
    try {
        const response = await fetch('https://fridge-craft-server.vercel.app/api/savedRecipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ recipeId, userId })
        });

        if (!response.ok) {
            throw new Error('Failed to add recipe to favorites');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getSavedRecipes(userId, token) {
    try {
        const response = await fetch(`https://fridge-craft-server.vercel.app/api/savedRecipes/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch saved recipes');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
         alert(error.message)
    }
}
