import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/Unauthenticated";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const App = () => {
  const { auth } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(false);


  useLayoutEffect(() => {
    if (auth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [auth]);

  return (
    <React.Suspense fallback={<CircularProgress />}>
      <div className="App">
        <BrowserRouter>
          {authenticated ? (
            <Authenticated isLoggedIn={auth} />
          ) : (
            <UnAuthenticated isLoggedIn={auth} />
          )}
        </BrowserRouter>
      </div>
    </React.Suspense>
  );
};

export default App;
