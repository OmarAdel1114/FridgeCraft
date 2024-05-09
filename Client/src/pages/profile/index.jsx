import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { data } = useSelector((state) => state?.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  function handleImageChange(e) {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    setFormData({
      ...formData,
      avatar: "https://dp6fqfehej69.cloudfront.net/" + e.target.files[0]?.name,
    });
  }

  const isSubmitDisabled = Object.values(formData).every(
    (value) => value === ""
  );

  return (
    <div className="mt-16 ml-12">
      <p className="lg:text-2xl 2xl:text-[36px] font-semibold py-6 border-b-4 border-borderColor">
        Edit Your Profile
      </p>

      <div className="flex mt-10">
        <div>
          <p className="text-[2rem]">Profile Information</p>
          <div className="flex">
            <div className="flex flex-col  xl:pt-5 lg:mt-5 mt-5">
              <label className="mb-2 font-medium text-[1.4rem]">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                className="outline-none border-2 bg-secondary border-secondary50 xl:w-[600px]
                lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
              />
            </div>
            <div className="flex flex-col  xl:pt-5 lg:mt-5 mt-5 lg:ml-10">
              <label className="mb-2 font-medium text-[1.4rem]">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                className="outline-none border-2 bg-secondary border-secondary50  xl:w-[600px] lg:w-[14rem] xss:w-[19.75rem] xs:w-[22.8rem]  p-3 rounded-lg text-base font-normal"
              />
            </div>
          </div>

          <div className="xl:w-80 lg:h-[3rem] block w-[10rem] mt-20">
            <button
              type="submit"
              className={`   ${
                !isSubmitDisabled ? "bg-DarkGreen" : "bg-LightGreen"
              } lg:w-52  rounded-3xl  text-white text-lg px-5 py-3`}
              disabled={isSubmitDisabled}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
