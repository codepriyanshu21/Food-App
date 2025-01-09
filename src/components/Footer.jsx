import React from "react";
// import github from "../assets/github.png";
import { Link, useLocation } from "react-router-dom";
import { SiGithub } from "react-icons/si";

const Footer = () => {
  const location=useLocation();

  if(location.pathname !=="/"){
    return null;
  }

  return (
    <section className="relative bg-black text-center text-white p-4">
      <span className="font-bold">Created By Priyanshu © 2024 Foodie Heaven. All rights reserved.</span>
      <div className="flex justify-center">
        <Link to={"https://github.com/codepriyanshu21"} target="_blank">
          <span className="w-12 h-12 text-xl"><SiGithub/></span>
        </Link>
      </div>
    </section>
  );
};

export default Footer;