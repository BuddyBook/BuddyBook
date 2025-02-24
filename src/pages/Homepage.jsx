import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utility/firebase";

import logo from "../assets/images/logo/BuddyBook-final.png";

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
      navigate("/teams");
    });
  };

  return (
    <div className="mt-8 p-8 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-3/5 bg-gradient-to-b from-purple-50 to-blue-50">
        <h1 className="text-5xl font-bold text-pastelPink mb-4 text-center">
          Welcome to BuddyBook
        </h1>
        <img src={logo} className="mx-auto mb-4 w-32" />

        <p className="text-gray-700 mb-6 text-center">
          A place to collect thoughts, memories, and messages from friends. Join
          in and leave your mark!
        </p>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleLogin}
            className="text-violet-500 border border-violet-500 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            <span className="bg-violet-500 shadow-violet-500 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            Get Started
          </button>
        </div>
        <p className="font-handwriting text-sm text-vibrantPurple text-center">
          Created by Uzma Shaik & Julia Solias 💌
        </p>
      </div>
    </div>
  );
}

export default Homepage;
