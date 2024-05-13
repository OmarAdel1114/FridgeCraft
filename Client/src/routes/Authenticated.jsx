import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import UnAuthenticated from "./Unauthenticated";
import Profile from "../pages/profile";
import AddRecipe from "../pages/recipe/AddRecipe";
import { useEffect, useLayoutEffect } from "react";

export default function Authenticated({ isLoggedIn }) {
  const { auth } = useSelector((state) => state.auth);
  const authTOKEN = localStorage.getItem("token");
  const navigate = useNavigate();

  //the condition will check if the user has signed-out, it
  //will take the user to "/login" route
  if (!authTOKEN) {
    return <UnAuthenticated />;
  }

  return (
    <Routes>
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/add-a-recipe" element={<AddRecipe />} />
    </Routes>
  );
}
