import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/Unauthenticated";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getCurrentUser } from "./api/services/auth.service";

const App = () => {
  const { auth, data } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (auth) {
      dispatch(getCurrentUser(data?.data?._id));
    }
  }, [auth, data?.data?._id]);

  useLayoutEffect(() => {
    if (auth) {
      setAuthenticated(true);
      console.log(data);
    } else {
      setAuthenticated(false);
    }
  }, [auth]);

  return (
<<<<<<< HEAD
   <>
   
   </>
=======
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
>>>>>>> 0d0f9a497122dba988d03ca0f5fa27e645642fbe
  );
};

export default App;
