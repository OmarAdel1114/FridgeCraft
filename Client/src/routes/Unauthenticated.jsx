import { Route, Routes } from "react-router-dom";

import Authenticated from "./Authenticated";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function UnAuthenticated({ isLoggedIn }) {
  if (isLoggedIn) {
    return <Authenticated isLoggedIn={isLoggedIn} />;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
