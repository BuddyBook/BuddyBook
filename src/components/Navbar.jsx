import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { House, Info, LogOut } from "lucide-react";

import logo from "../assets/images/logo/BuddyBook-final.png";

import "../components/Navbar.css";

function Navbar() {
  const [signOut, loading, error] = useSignOut(auth);

  const [user] = useAuthState(auth);

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut()
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  return (
    <div className="navbar-container flex justify-between items-center bg-white shadow-md px-6 py-3 top-0 w-full z-50">
      {/* Logo */}
      <NavLink to="/">
        <img src={logo} alt="Logo" className="h-10 w-auto -rotate-10" />
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {currentPath !== "/" && (
          <NavLink
            to="/"
            className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            <House
              className="transition-colors duration-200 group-hover:text-pink-500"
              color="currentColor"
              size={22}
            />
            <span className="font-medium">Home</span>
          </NavLink>
        )}

        <NavLink
          to="/about"
          className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
        >
          <Info />
          <span className="font-medium">About</span>
        </NavLink>

        {/* Logout Button (Only if user exists) */}
        {user && (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            <LogOut
              className="transition-colors duration-200 group-hover:text-pink-500"
              color="currentColor"
              size={22}
            />
            <span className="font-medium">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
export default Navbar;
