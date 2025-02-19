import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { House, LogOut } from "lucide-react";

import "../components/Navbar.css";

function Navbar() {
  const [signOut, loading, error] = useSignOut(auth);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div className="button-container">
        <NavLink
          to="/"
          className="flex items-center gap-1 text-[rgb(0,0,0.3)] transition-colors duration-300 hover:text-[rgb(249,25,152)] group"
        >
          <House
            className="transition-colors duration-200 group-hover:text-[rgb(249,25,152)]"
            color="currentColor"
            size={20}
          />
          Home
        </NavLink>

        {user && (
          <NavLink
            to="/"
            className="flex items-center gap-1 text-[rgb(0,0,0.3)] transition-colors duration-300 hover:text-[rgb(249,25,152)] group"
          >
            <LogOut
              className="transition-colors duration-200 group-hover:text-[rgb(249,25,152)]"
              color="currentColor"
              size={20}
            />
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default Navbar;
