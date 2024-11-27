import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      {/* Responsive Logo with Navigation */}
      <Link to="/"> {/* Wrap the image with Link */}
        <img 
          className="w-[60px] sm:w-[40px] md:w-[70px] h-auto" // Adjusts size based on screen width
          src={assets.image}
          alt="Logo"
        />
      </Link>
      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-gray-900 text-white px-5 py-2 sm:px-7 rounded-medium text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

