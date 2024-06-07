import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";

const sections = [
    {
        title: "Quick Links",
        items: ["Recipes", "Generate", "Add Recipe"],
      },  
    {
        title: "Company",
        items: ["Overview", "About", "Contact"],
    },
    {
        title: "Legal",
        items: ["Privacy Policy", "Terms of Service", "FAQs"],
    },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div className="w-full bg-DarkGreen text-White py-10 lg:pt-20 lg:pb-10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 lg:px-0 grid justify-between grid-cols-3 gap-5 md:gap-x-8 lg:gap-x-16 md:grid-cols-5 border-b border-White pb-5 md:pb-10">
      <div className="md:col-span-2 col-span-3">
          <p className="font-bold uppercase">Try out our AI Recipe Generation</p>
          <p className="py-4">
            Running out of ideas for what to cook? Let our AI Recipe Generator help you out by recommending hundreds of recipes based on the ingredients you have at home.
          </p>
          <Link to="/aigeneration">
          <button className="rounded border border-White py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-DarkGreen">
        Generate Recipes
      </button>
      </Link>
        </div>

        {sections.map((section, index) => (
          <div key={index}>
            <h6 className="font-bold uppercase pb-3.5">{section.title}</h6>
            <ul>
              {section.items.map((item, i) => (
                <li key={i} className="py-1 cursor-pointer text-White">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        
      </div>

      <div className="flex flex-col max-w-[1240px] px-6 md:px-8 lg:px-0 pt-5 md:pt-10 mx-auto justify-between gap-y-5 sm:flex-row text-center text-White">
      <p className='text-base'>2024 Recipe Craft. All rights reserved</p>
        <div className="flex justify-between sm:w-[200px] text-2xl">
          {items.map((x, index) => {
            return <x.icon key={index} className="cursor-pointer" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;