/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config/api";

function CustomAnswer({ teamId, profileId, user, onRefresh }) {
  const [answer, setAnswer] = useState("");

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    axios
      .post(
        `${API_URL}/teams/${teamId}/members/${profileId}/customAnswers.json`,

        {
          email: user.email,
          name: user.displayName,
          answer,
        }
      )
      .then((response) => {
        setAnswer("");
        onRefresh();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="relative w-full max-w-xs">
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="w-full h-10 px-4 text-sm text-black placeholder-gray-400 bg-gray-50 border border-purple-50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#a9a9b3] transition-all duration-200 ease-in-out"
          name="answer"
          type="text"
          value={answer}
          placeholder="Type your answer and hit enter..."
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
}

export default CustomAnswer;
