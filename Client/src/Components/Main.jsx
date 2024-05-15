import { Grid } from "@mui/material";
import Header from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axiosInstance from "../api/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Main({ children }) {
  const path = useLocation();
  const { data } = useSelector((state) => state.auth);
  const [user, setUser] = useState("");

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get(`/users/${data?.data?._id}`);
      const responseData = response.data;
      setUser(responseData?.data);

      return responseData;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {path.pathname !== "/profile" && (
        <div className="h-20  shadow-sticky bg-white backdrop-blur-sm top-0">
          <Header firstname={user?.firstName} lastname={user?.lastName} />
        </div>
      )}
      <Grid container spacing={1} className="bg-secondary h-screen bottom-0">
        <Grid item className="bg-secondary lg:w-full w-full m-auto">
          {children}
        </Grid>

        <div className="w-full">
          <Footer />
        </div>
      </Grid>
    </>
  );
}

export default Main;
