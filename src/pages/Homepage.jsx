import { useNavigate } from "react-router-dom";

//TODO Tailwind classes not applying correctly
function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-pastelPink via-pastelBlue to-pastelGreen min-h-screen flex flex-col justify-center items-center text-center p-6">
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl border-4 border-pastelYellow">
        <p className="font-handwriting text-sm mb-2 text-vibrantPurple">
          Created by Julia Solias & Uzma Shaik. 
          <a href="#" className="underline">About us →</a>
        </p>
        <h1 className="text-5xl font-bold text-pastelPink mb-4">
          Welcome to BuddyBook
        </h1>
        <p className="text-gray-700 mb-6">
          A place to collect thoughts, memories, and messages from friends. Join in and leave your mark!
        </p>
        <button onClick={() => navigate('/category')} className="bg-pastelBlue hover:bg-vibrantPurple font-bold py-2 px-6 rounded-full transition duration-300">
          View Teams 
        </button>
      </div>
    </div>
  );
}

export default Homepage;