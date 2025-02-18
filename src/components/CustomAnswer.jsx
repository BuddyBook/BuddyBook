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

  const handleOnClick = (e) => {
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
    <div className="relative mt-6">
      <input
        type="text"
        value={answer}
        onChange={handleChange}
        className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
      />
      <div className="absolute inset-y-1 right-1 flex justify-end">
        <button
          type="submit"
          onClick={handleOnClick}
          className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
        >
          <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 3 10 .5v2H0v1h10v2L16 3Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CustomAnswer;
