import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [signOut, loading, error] = useSignOut(auth);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <div>
      <h2>Buddy Book</h2>

      {user && (
        <button
          onClick={() => {
            signOut(auth);
            navigate("/");
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
export default Navbar;
