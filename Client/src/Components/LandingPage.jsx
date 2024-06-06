import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeItem from './RecipeItem'; // Assuming RecipeItem component is already created
import landingpageBackground from '../assets/landingpageBackground.webp'

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://fridge-craft-server.vercel.app/api/recipes')
      .then(response => {
        setRecipes(response.data.slice(0, 6)); // Get the first 6 recipes
      })
      .catch(error => {
        console.error('There was an error fetching the recipes!', error);
      });
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{  backgroundImage: `url(${landingpageBackground})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Recipe Craft</h1>
          <p className="text-lg text-white mb-8">Discover and share everyday cooking inspiration.</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded">Get Started</button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-8">Recipe Craft is your go-to source for delicious recipes, cooking tips, and inspiration. Whether you're a beginner or a seasoned chef, we have something for everyone.</p>
      </section>

      {/* Recipes Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(recipe => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-green-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg mb-8">We provide a wide variety of recipes that are easy to follow and delicious. Our community is passionate about cooking and sharing their experiences.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg mb-8">Browse our collection of recipes, save your favorites, and share your own recipes with the community. It's that simple!</p>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-8">Sign up now and start exploring, cooking, and sharing!</p>
          <button className="bg-white text-green-500 py-2 px-4 rounded">Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default App;
