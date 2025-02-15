import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

import "../pages/MembersPage.css";

function MembersPage() {
  const { id } = useParams();

  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${id}.json`)
      .then((response) => {
        console.log(response.data);
        const members = response.data.members;

        if (members) {
          const profilesArray = Object.keys(members).map((id) => ({
            id,
            ...members[id],
          }));

          setTeam(profilesArray);
        }
      })

      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  if (team === undefined) {
    return "Loading...";
  }

  return (
    <div>
      <h1>Members Page of : {team.createdBy} </h1>
      <h2>Team Id is : {id} </h2>
      <h2>Team Name : {team.teamName}</h2>

      <NavLink to={`/profile/create/${id}`}>
        <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Your Profile
        </button>
      </NavLink>

      <div className="flex gap-5 justify-evenly flex-wrap">
        {team.map((profileObj) => {
          return (
            <div
              key={profileObj.id}
              className="flex relative items-center justify-center"
            >
              <div className="rounded-xl min-h-40 w-40 overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl">
                <div className="text-gray-500 group-hover:scale-105 transition-all">
                  <svg
                    className="w-16 h-16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
                <div className="group-hover:pb-10 transition-all duration-500 delay-200">
                  <h1 className="font-semibold text-gray-700">
                    {profileObj.name}
                  </h1>
                  <p className="text-gray-500 text-sm break-all">
                    {profileObj.place}
                  </p>
                </div>
                <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
                  <div className="flex gap-3 bg-gray-700 text-white p-0.7 transition-all duration-500 delay-200 rounded-full shadow-sm">
                    <a className="hover:scale-110 transition-all duration-500 delay-200 m-1">
                      <span className="text-10px p-4">View</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MembersPage;
