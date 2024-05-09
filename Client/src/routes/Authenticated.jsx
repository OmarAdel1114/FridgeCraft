import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

// import Main from "../components/main/Main";
// import Header from "../components/header/Header";
// import SideBar from "../components/sidebar/SideBar";
// import Footer from "../components/footer/Footer";
import UnAuthenticated from "./Unauthenticated";
import { useEffect } from "react";
import Main from "../Components/Main";
import Header from "../Components/Navbar";
import Footer from "../Components/Footer";
import Profile from "../pages/profile";

export default function Authenticated({ isLoggedIn }) {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const authTOKEN = localStorage.getItem("token");

  useEffect(() => {
    if (!auth || !authTOKEN) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authTOKEN, navigate]);

  //the condition will check if the user has signed-out, it
  //will take the user to "/login" route
  if (!auth || !authTOKEN) {
    return <UnAuthenticated />;
  }

  return (
    <Main>
      <Header />
      <Routes>
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      {/* <SideBar /> */}

      <Routes></Routes>
      <Footer />
    </Main>
  );
}
