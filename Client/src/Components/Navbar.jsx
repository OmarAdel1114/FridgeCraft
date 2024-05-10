import React, { useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";

const Header = () => {
  const { auth, data } = useSelector((state) => state.auth);

  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Generate", link: "/" },
    { name: "Recipes", link: "/" },
    { name: "Contact", link: "/" },
  ];
  let [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const anchorOpen = Boolean(anchorEl);
  const id = anchorOpen ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <container className="shadow-md flex flex-col items-center">
      <div className="w-full lg:max-w-[1240px] lg:mx-auto px-6 md:px-8 lg:px-0">
        <div className="flex items-center justify-between bg-white py-4">
          {/* logo section */}
          <div className="cursor-pointer flex items-center gap-1">
            <img src={logo} width="100px" />
          </div>

          {/* linke items */}
          <div className="flex border rounded-full items-center flex-row py-2 px-3.5 border-LightBlack ml-0 lg:ml-5">
            <input
              type="text"
              className="min-w-[80%] md:min-w-[300px] outline-0 text-LightBlack text-base"
              placeholder="Search"
            />
            <FaSearch className="cursor-pointer" />
          </div>
          {/* Menu icon */}
          <div
            onClick={() => setOpen(!open)}
            className=" cursor-pointer lg:hidden w-7 h-7"
          >
            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>

          <ul
            className={`shadow-md lg:shadow-none lg:flex lg:items-center lg:pb-0 pb-6 absolute lg:static bg-White md:z-auto z-[1] left-0 w-full lg:w-auto  px-6 md:px-8 lg:px-0 transition-all duration-500 ease-in ${
              open ? "top-20" : "top-[-490px]"
            }`}
          >
            {Links.map((link, index) => (
              <li
                className="lg:ml-5 lg:py-0 py-4 text-base font-medium border-b lg:border-0"
                key={index}
              >
                <a
                  href={link.link}
                  className="text-LightBlack hover:text-DarkGreen duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <button className="mt-6 lg:mt-0 rounded border border-DarkGreen bg-DarkGreen lg:ml-5 py-3 px-8 text-base font-medium  leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
              Login/Signup
            </button>
            {auth && (
              <>
                <div
                  className="lg:flex w-[10rem] items-center mr-2 cursor-pointer  hidden ml-10"
                  onClick={handleClick}
                  aria-describedby={id}
                >
                  <div className="mr-2">
                    <Avatar
                      sx={{ width: 56, height: 56, background: "#D7E0D8" }}
                    >
                      {data?.data?.firstName?.charAt(0)?.toUpperCase() +
                        " " +
                        data?.data?.lastName?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>
                  </div>
                  <div>
                    <div>
                      <p className="text-black text-sm font-medium">
                        {data?.data?.firstName + " " + data?.data?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-black text-xs">{data?.data?.email}</p>
                    </div>
                  </div>
                  <span className="pr-2">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.99529 7.99023L0.669544 0.497818L9.32104 0.497818L4.99529 7.99023Z"
                        fill="#2E5834"
                      />
                    </svg>
                  </span>
                </div>
                <ProfileDropDown
                  open={anchorOpen}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  id={id}
                />
              </>
            )}
          </ul>
          {/* button */}
        </div>
      </div>
    </container>
  );
};

export default Header;
