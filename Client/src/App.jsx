import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/Unauthenticated";
import { BrowserRouter } from "react-router-dom";
import SearchPage from "./Components/SearchPage"

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

  console.log(auth);
  return (
   <>
   
   </>
  );
};

export default App;
