import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

import dummyImage from "../assets/images/dummy-profile-image.png";

import "../pages/MembersPage.css";

function MembersPage() {
  const { id } = useParams();

  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${id}.json`)
      .then((response) => {
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
      <h1>Members Page of: {team.createdBy} </h1>
      <h2>Team Id is: {id} </h2>
      <h2>Team Name: {team.teamName}</h2>

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
                  <img
                    className="p-10"
                    src={
                      profileObj.profileImage
                        ? profileObj.profileImage
                        : dummyImage
                    }
                  />
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
                    <NavLink
                      to={`/teams/${id}/profile/${profileObj.id}`}
                      className="hover:scale-110 transition-all duration-500 delay-200 m-1"
                    >
                      <span className="text-10px p-4">View</span>
                    </NavLink>
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
