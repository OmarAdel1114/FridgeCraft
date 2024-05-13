import { Route, Routes, useNavigate } from "react-router-dom";

import Authenticated from "./Authenticated";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function UnAuthenticated({ isLoggedIn }) {
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);

 
  
  if (isLoggedIn) {
    return <Authenticated isLoggedIn={isLoggedIn} />;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
