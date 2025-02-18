import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../utility/firebase";

//TODO Tailwind classes not applying correctly
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
    <div className="min-h-screen bg-gradient-to-br p-8 flex flex-col justify-center items-center text-center">
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl border-4 border-pastelYellow">
        <p className="font-handwriting text-sm mb-2 text-vibrantPurple">
          Created by Julia Solias & Uzma Shaik.
          <NavLink to="/about" className="underline">
            About us →
          </NavLink>
        </p>
        <h1 className="text-5xl font-bold text-pastelPink mb-4">
          Welcome to BuddyBook
        </h1>
        <p className="text-gray-700 mb-6">
          A place to collect thoughts, memories, and messages from friends. Join
          in and leave your mark!
        </p>
        <button
          onClick={handleLogin}
          className="bg-pastelBlue hover:bg-vibrantPurple font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Homepage;
