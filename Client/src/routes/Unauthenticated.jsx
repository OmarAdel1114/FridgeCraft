import { Route, Routes, useNavigate } from "react-router-dom";

import Authenticated from "./Authenticated";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { useEffect } from "react";
import ForgotPassword from "../pages/auth/ForgotPassword";

export default function UnAuthenticated({ isLoggedIn }) {
  const navigate = useNavigate();
  if (isLoggedIn) {
    console.log("authenticated is logged in ");
    navigate("/profile");
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route exact path="/login" element={<Login />} />

      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
