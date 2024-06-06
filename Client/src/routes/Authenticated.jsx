import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import UnAuthenticated from "./Unauthenticated";
import Profile from "../pages/profile";
import AddRecipe from "../pages/recipe/AddRecipe";
import { useEffect, useLayoutEffect } from "react";
import Main from "../Components/Main";
import Search from "../pages/Search/Search";
import RecipeDetail from "../Components/RecipeDetail";
import Favorites from "../Components/FavoritesPage"
import LandingPage from "../pages/landing/LandingPage";

export default function Authenticated({ isLoggedIn }) {
  const { data, auth, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const authTOKEN = localStorage.getItem("token");

 console.log(`data ===>`,data)


  useEffect(() => 
    {
    if (!auth || !authTOKEN) {
      console.log("not logged in on auth page");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authTOKEN, navigate]);

  //the condition will check if the user has signed-out, it
  //will take the user to "/login" route
  if (!isLoggedIn) {
    console.log("is logged in auth page");
    return <UnAuthenticated />;
  }

  return (
    <Main>
      <Routes>
      <Route path="/landing" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-a-recipe" element={<AddRecipe />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/favorites" element={<Favorites user={data.user} />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
      </Routes>
    </Main>
  );
}
