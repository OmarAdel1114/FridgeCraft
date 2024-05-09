// import { useState } from 'react'
// import React from 'react'
// import Navbar from'./Components/Navbar'
// import UserNavbar from './Components/UserNavbar'
import Login from "./pages/auth/Login";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/Unauthenticated";

//import SavedRecipes from './Components/SavedRecipes'

const App = () => {
  const { auth } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (auth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [auth]);

  return (
    <>
        {/* <Route path='/' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register/>}/> */}

        {authenticated ? (
          <Authenticated isLoggedIn={auth} />
        ) : (
          <UnAuthenticated isLoggedIn={auth} />
        )}
    </>
  );
};

export default App;
