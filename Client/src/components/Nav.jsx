import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-blue-500 p-4" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-white font-bold text-2xl">
            <FontAwesomeIcon icon={faPlane} className="text-white text-4xl mr-2" />
            Trip Junkie
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-1 justify-center">
          <Link to="/" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
            Home
          </Link>
          <Link to="/aboutus" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
            About Us
          </Link>
          <Link to="/favorite" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
            Trips
          </Link>
          <Link to="/contact-us" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
            Contact
          </Link>
          {/* New Merch Link */}
          <Link to="/merch" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
            Merch
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {auth.loggedIn() ? (
            <Link onClick={() => auth.logout()} className="text-white text-lg mx-4 font-bold hover:text-gray-200">
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
                Login
              </Link>
              <Link to="/signup" className="text-white text-lg mx-4 font-bold hover:text-gray-200">
                Signup
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <FontAwesomeIcon icon={faBars} className="text-white text-2xl cursor-pointer" onClick={toggleMenu} />
          {showMenu && (
            <div className="absolute top-16 right-0 bg-blue-500 text-white rounded-lg shadow-md p-2">
              <Link to="/" className="block py-1 hover:text-gray-200 font-bold">
                Home
              </Link>
              <Link to="/aboutus" className="block py-1 hover:text-gray-200 font-bold">
                About Us
              </Link>
              <Link to="/services" className="block py-1 hover:text-gray-200 font-bold">
                Services
              </Link>
              <Link to="/contact" className="block py-1 hover:text-gray-200 font-bold">
                Contact
              </Link>
              <Link to="/merch" className="block py-1 hover:text-gray-200 font-bold">
                Merch
              </Link>
              <Link to="/login" className="block py-1 hover:text-gray-200 font-bold">
                Login
              </Link>
              <Link to="/signup" className="block py-1 hover:text-gray-200 font-bold">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

