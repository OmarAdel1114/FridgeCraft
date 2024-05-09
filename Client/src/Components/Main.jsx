import { Grid } from "@mui/material";
import Header from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Main({ children }) {
  return (
    <>
      <div className="h-20  shadow-sticky bg-white backdrop-blur-sm top-0">
        <Header />
      </div>

      <Grid
        container
        spacing={1}
        className="bg-secondary h-screen bottom-0"
      >
        <Grid
          item
          lg={2.5}
          xl={2.6}
          md={3}
          className="lg:block hidden mt-10"
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          lg={9.5}
          xl={8.8}
          md={9}
          className="bg-secondary lg:w-full w-full m-auto"
        >
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
