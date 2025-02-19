import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../utility/firebase";

function Homepage() {
  const [signInWithGoogle, credentials, signInLoading, signInError] =
    useSignInWithGoogle(auth);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (user) {
      navigate("/teams");
      return;
    }
    if (signInLoading) {
      return;
    }
    signInWithGoogle().then((response) => {
      console.log(response);
      navigate("/teams");
    });
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-3/5 bg-gradient-to-b from-purple-50 to-blue-50">
        <h1 className="text-5xl font-bold text-pastelPink mb-4 text-center">
          Welcome to BuddyBook
        </h1>
        <img
              src="src/assets/images/logo/BuddyBook-pink-logo.png"
              className="mx-auto mb-4 w-32"
            />

        <p className="text-gray-700 mb-6 text-center">
          A place to collect thoughts, memories, and messages from friends. Join
          in and leave your mark!
        </p>
      
        <div className="flex justify-center mb-4">
          <button
            onClick={handleLogin}
            className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-full transition duration-300"
          >
            Get Started
          </button>
        </div>
        <p className="font-handwriting text-sm text-vibrantPurple text-center">
          Created by Julia Solias & Uzma Shaik.
          <br /><br />
          <NavLink to="/about" className="underline">
            About us →
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Homepage;