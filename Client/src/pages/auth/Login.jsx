import {useState } from "react";
//import {Link} from 'react-router-dom'
import CoverImage from "../../assets/cover_image.jpeg";
import LoginLogo from "../../assets/login_logo.jpg";
import GOOGLE_ICON from "../../assets/google-icon-logo.svg";
// import { AuthenticationContext } from "../../Components/AuthenticationProvider";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/services/auth.service";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { auth, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    //dispatch the loginUser functionality from the store, endpoint of login has been implemented in loginUser() function.
    await dispatch(loginUser({ email, password }));

   
    //if user get authenticated, the route will be changed to "dashboard"
    if (auth) {
      navigate("/profile");
    } else {
      return;
    }
  };


  //method to navigate to register page by pressing register button
  const navigateToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <div className="w-full h-screen  flex items-start">
          <div className="relative w-1/2 h-full flex flex-col">
            <img src={CoverImage} className="w-full h-full object-cover" />
          </div>

          <div className="w-1/2 h-full bg-[#F7F7F7] flex flex-col p-20 justify-between items-center">
            <div className="w-151 h-90 mr-auto   ">
              <img src={LoginLogo} className="absolute top-[-10px]" />
            </div>

            <div className="w-full flex flex-col max-w-[500px] ">
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-3xl font-semibold mb-2 ">Login</h3>

                <p className="text-base mb-2 ">
                  {" "}
                  welcome back! please enter your details
                </p>
              </div>

              <div className="w-full flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none 
                    ${emailError && "border-b-2 border-red-600"}
                  `}
                />

                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none
                  ${passwordError && "border-b-2 border-red-600"}
                  `}
                />
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center ">
                  <input type="checkbox" className="w-4 h-4 mr-2" />

                  <p className="text-sm">Remember Me </p>
                </div>

                <Link to="/forgot-password" className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2  hover:text-white">
                  Forgot Password?
                </Link>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-black hover:text-white"
                >
                  {"Log In"}
                </button>

                <button
                  className="w-full text-black my-2 font-semibold bg-white border-2
                 border-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-[#2E5834] hover:text-white"
                  onClick={navigateToRegister}
                >
                  Register
                </button>
              </div>

              <div className="w-full flex items-center justify-center relative py-2">
                <div className="w-full h-[1PX] bg-black "> </div>

                <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">
                  {" "}
                  or
                </p>
              </div>

              <button className="w-full text-black my-2 font-semibold bg-white border-2 border-[#2E5834] rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-black hover:text-white ">
                <img src={GOOGLE_ICON} className="h-6 mr-2" />
                Sign In With Google
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-[#060606] ">
                Dont have an account?{" "}
                <Link to="/register">
                  <span className="font-semibold underline underline-offset-2 cursor-pointer  hover:text-DarkGreen">
                    sign up for free
                  </span>{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
