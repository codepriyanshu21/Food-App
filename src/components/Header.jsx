import React, { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants.jsx";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="w-full fixed top-0 bg-gradient-to-r from-blue-200 via-blue-200 to-blue-300 shadow-md z-10">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
        {/* Logo Section */}
        <div>
          <Link to="/">
          <img
            className="w-16 h-16 rounded-full object-cover shadow-sm"
            src={LOGO_URL}
            alt="logo"
          />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-gray-800 font-medium">
          {/* Cart Icon with Item Count */}
          <span className="relative  cursor-pointer flex">
            <Link to="/cart">
              <FaShoppingCart className="text-2xl" />
            </Link>
            {cartItems.length > 0 && (
              <div
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs bg-green-500 text-white rounded-full shadow-sm"
              >
                {cartItems.length}
              </div>
            )}
          </span>

          {/* Login Button */}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="px-4 py-2 font-bold border border-solid border-black  rounded-lg shadow-sm hover:bg-blue-400 transition-all duration-300"
          >
            {!loggedInUser ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to="#">{loggedInUser}</Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
