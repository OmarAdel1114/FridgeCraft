import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

// import Main from "../components/main/Main";
// import Header from "../components/header/Header";
// import SideBar from "../components/sidebar/SideBar";
// import Footer from "../components/footer/Footer";
import UnAuthenticated from "./Unauthenticated";
import { useEffect } from "react";
import Main from "../Components/Main";
import Profile from "../pages/profile";
import AddRecipe from "../pages/recipe/AddRecipe";

export default function Authenticated({ isLoggedIn }) {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const authTOKEN = localStorage.getItem("token");

  useEffect(() => {
    if (!auth || !authTOKEN) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authTOKEN, navigate]);

  //the condition will check if the user has signed-out, it
  //will take the user to "/login" route
  if (!auth || !authTOKEN) {
    return <UnAuthenticated />;
  }

  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-a-recipe" element={<AddRecipe />} />
    </Routes>
  );
}
