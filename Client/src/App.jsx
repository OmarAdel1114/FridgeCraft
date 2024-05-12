import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/Unauthenticated";
import { BrowserRouter } from "react-router-dom";

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
    <div className="App">
      {/* <Route path='/' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register/>}/> */}

      <BrowserRouter>
        {authenticated ? (
          <Authenticated isLoggedIn={auth} />
        ) : (
          <UnAuthenticated isLoggedIn={auth} />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
