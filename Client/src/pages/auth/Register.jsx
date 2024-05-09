import { useState } from "react";
//import {Link} from 'react-router-dom'
import CoverImage from "../../assets/cover_image.jpeg";
import LoginLogo from "../../assets/login_logo.jpg";
import GOOGLE_ICON from "../../assets/google-icon-logo.svg";
// import { AuthenticationContext } from "../../Components/AuthenticationProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://fridge-craft-server.vercel.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            userName,
          }),
        }
      );
      const data = await response.json();
      console.log("API response:", data);
      toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setUserName("");
        setFirstName("");
        setLastName("");
      }, 2500);

      return data;

      // Handle the API response accordingly (e.g., redirect user on successful login)
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
      if (error.message.includes("email")) {
        setError("Error in email: " + error.message);
      } else if (error.message.includes("password")) {
        setError("Error in password: " + error.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      //show the error in a toast on top-right corner of the screen

      toast.error(error?.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  //method to navigate to register page by pressing register button
  const navigatetoLogin = () => {
    navigate("/");
  };
  return (
    <>
      <ToastContainer />

      <form onSubmit={handleRegister}>
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
                <h3 className="text-3xl font-semibold mb-2 ">
                  Create an Account
                </h3>
              </div>

              <div className="w-full flex flex-col">
                <form>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />

                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                </form>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-black my-2 font-semibold bg-white border-2
                 border-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-[#2E5834] hover:text-white"
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
                Sign up With Google
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-[#060606] ">
                Already have an account?{" "}
                <span
                  className="font-semibold underline underline-offset-2 cursor-pointer  hover:text-white"
                  onClick={navigatetoLogin}
                >
                  login
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Register;
