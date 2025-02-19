/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config/api";

function Comments({ teamId, profileId, user, onRefresh }) {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/teams/${teamId}/members/${profileId}/comments.json`, {
        comment,
        name: user.displayName,
      })
      .then((response) => {
        setComment("");
        onRefresh();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <div className="relative w-full max-w-xs mb-5">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[90%] md:w-[400px] h-10 px-4 text-sm text-black placeholder-gray-400 bg-gray-50 border border-purple-50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#a9a9b3] transition-all duration-200 ease-in-out"
          name="text"
          type="text"
          value={comment}
          placeholder="Enter your comment..."
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Comments;
