import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

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

  const removeFromFavorites = (recipeId) => {0-
    setFavorites(favorites.filter(recipe => recipe._id !== recipeId));
  };

  return (
    <AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
