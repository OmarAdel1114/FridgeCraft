// import { Avatar } from "@mui/material";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Camera from "../../assets/camera.svg";
// import avatar from "../../assets/user-avatar.svg";
import axiosInstance from "../../api/config";
import { ToastContainer, toast } from "react-toastify";
import Main from "../../Components/Main";
import Header from "../../Components/Navbar";
import { getCurrentUser } from "../../api/services/auth.service";

const Profile = () => {
  //fetch the user details from the redux store
  const { data, user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  // const [user, setUser] = useState();

  //variables for updating formData
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    email: user?.email,
    password: "",
  });

  //method for capturing form values
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //methodd for updating profile
  const handleProfileUpdate = async (e) => {
    e?.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/users/profile/${user?._id}`,
        formData
      );
      const responseData = response.data;
      toast.success("Profile Update Successfully", {
        autoClose: 1500,
        position: "top-right",
      });
      // getProfile();
      dispatch(getCurrentUser(data.data._id));
      return responseData;
    } catch (e) {
      console.log("error", e);
      toast.error("Cannot Update Profile", {
        autoClose: 1500,
        position: "top-right",
      });
    }
  };



  return (
    <Main>
      <div className="h-20  shadow-sticky bg-white backdrop-blur-sm top-0 w-full">
        <Header firstname={user?.firstName} lastname={user?.lastName} />
      </div>
      <div className="mt-16 ml-12">
        <ToastContainer />
        <p className="lg:text-2xl 2xl:text-[36px] font-semibold py-6 border-b-4 border-borderColor">
          Edit Your Profile
        </p>

        <form className="flex flex-col mt-10" onSubmit={handleProfileUpdate}>
          {/* <p className="mt-2 mb-5 text-[2rem]">Profile Photo</p>
        <div className="personal-image">
          <label className="label">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/jpeg, image/png"
            />
            <figure className="personal-figure">
              {data?.image ? (
                <img
                  src={(typeof file !== "undefined" && image) || ""}
                  className="personal-avatar"
                  alt="avatar"
                />
              ) : (
                <img
                  src={(typeof file !== "undefined" && image) || avatar}
                  className="personal-avatar bg-[#D9D9D9]"
                  alt="avatar"
                />
              )}
              <figcaption className="personal-figcaption w-full">
                <img alt="" src={Camera} className="flex justify-center" />
              </figcaption>
            </figure>{" "}
          </label>
        </div> */}
          <div className="mt-10">
            <p className="text-[2rem]">Profile Information</p>
            <div className="flex">
              <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5">
                <label className="mb-2 font-normal text-[1.4rem]">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData?.firstName}
                  defaultValue={user?.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
                lg:w-[28rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>
              <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5 lg:ml-10">
                <label className="mb-2 font-normal text-[1.4rem]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  defaultValue={user?.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  className="outline-none border-2 bg-secondary border-secondary50  2xl:w-[500px] lg:w-[28rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5">
                <label className="mb-2 font-normal text-[1.4rem]">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter User Name"
                  className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
                lg:w-[28rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>
              <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5 lg:ml-10">
                <label className="mb-2 font-normal text-[1.4rem]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  defaultValue={user?.email}
                  placeholder="Enter Email"
                  className="outline-none border-2 bg-secondary border-secondary50  2xl:w-[500px] lg:w-[28rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
                />
              </div>
            </div>
            <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5">
              <label className="mb-2 font-normal text-[1.4rem]">Password</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
                lg:w-[28rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
              />
            </div>

            <div className="xl:w-80 lg:h-[3rem] block w-[10rem] 2xl:mt-20 lg:mt-10 mb-10">
              <button
                type="submit"
                className={`   ${"bg-DarkGreen"} lg:w-52  rounded-3xl  text-white text-lg px-5 py-3`}
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Profile;
