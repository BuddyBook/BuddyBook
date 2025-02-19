/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config/api";
import { Send } from "lucide-react";

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
        console.log(response.data);
        setAnswer("");
        onRefresh();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit}>
        <div className="relative rounded-lg w-100 overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:-z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
          <input
            name="answer"
            value={answer}
            onChange={handleChange}
            placeholder="Type and hit enter.."
            className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-black-500 block w-full p-2.5 checked:bg-emerald-500"
            type="text"
          />
        </div>
      </form>
    </div>
  );
}

export default CustomAnswer;
