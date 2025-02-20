import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

import { Plus, User } from "lucide-react";
import "../pages/MembersPage.css";

function MembersPage() {
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);

  const colorSets = [
    // Yellow shades
    {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      icon: "text-yellow-400",
    },
    {
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      icon: "text-yellow-500",
    },
    { bg: "bg-amber-100", border: "border-amber-200", icon: "text-amber-400" },

    // Blue shades
    { bg: "bg-blue-100", border: "border-blue-200", icon: "text-blue-400" },
    { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-500" },
    { bg: "bg-sky-100", border: "border-sky-200", icon: "text-sky-400" },

    // Green shades
    { bg: "bg-green-100", border: "border-green-200", icon: "text-green-400" },
    { bg: "bg-green-50", border: "border-green-100", icon: "text-green-500" },
    {
      bg: "bg-emerald-100",
      border: "border-emerald-200",
      icon: "text-emerald-400",
    },

    // Pink shades
    { bg: "bg-pink-100", border: "border-pink-200", icon: "text-pink-400" },
    { bg: "bg-pink-50", border: "border-pink-100", icon: "text-pink-500" },
    { bg: "bg-rose-100", border: "border-rose-200", icon: "text-rose-400" },

    // Purple shades
    {
      bg: "bg-purple-100",
      border: "border-purple-200",
      icon: "text-purple-400",
    },
    {
      bg: "bg-purple-50",
      border: "border-purple-100",
      icon: "text-purple-500",
    },
    {
      bg: "bg-violet-100",
      border: "border-violet-200",
      icon: "text-violet-400",
    },

    // Orange shades
    {
      bg: "bg-orange-100",
      border: "border-orange-200",
      icon: "text-orange-400",
    },
    {
      bg: "bg-orange-50",
      border: "border-orange-100",
      icon: "text-orange-500",
    },
    { bg: "bg-amber-100", border: "border-amber-200", icon: "text-amber-400" },

    // Teal shades
    { bg: "bg-teal-100", border: "border-teal-200", icon: "text-teal-400" },
    { bg: "bg-teal-50", border: "border-teal-100", icon: "text-teal-500" },
    { bg: "bg-cyan-100", border: "border-cyan-200", icon: "text-cyan-400" },
  ];

  // Function to get a random color set
  const getRandomColorSet = () => {
    const randomIndex = Math.floor(Math.random() * colorSets.length);
    return colorSets[randomIndex];
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${id}.json`)
      .then((response) => {
        const { members: teamMembers, ...teamData } = response.data;
        setTeam(teamData);

        if (teamMembers) {
          const profilesArray = Object.keys(teamMembers).map((id) => ({
            id,
            ...teamMembers[id],
          }));

          setMembers(profilesArray);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [id]);

  if (team === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-9 ml-9">
        <BackButton text="Back to Teams" to="/teams" />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 justify-center w-full px-6 pb-6 md:px-10 md:pb-0 md:mb-8 mt-4">
        <div className="text-center flex-1">
          <h2 className="text-4xl font-bold text-black drop-shadow-lg">
            Team Name: {team.teamName}
          </h2>
          <h1 className="text-xs !mb-0 !text-gray-400 font-bold mt-1">
            Created by {team.createdBy}
          </h1>
        </div>
      </div>

      <NavLink to={`/profile/create/${id}`}>
        <button className="flex gap-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md mx-auto  mb-10">
          <Plus strokeWidth={4} size={25} />
          Add Your Profile
        </button>
      </NavLink>

      <div className="flex justify-evenly flex-wrap gap-6 ml-10 mr-10 mb-10">
        {!members.length ? (
          <div className="flex items-center justify-center text-gray-300 mt-30">
            No Profiles Created!
          </div>
        ) : (
          members.map((profileObj) => {
            // Assign a unique random color set to each card
            const colors = getRandomColorSet();

            return (
              <div
                key={profileObj.id}
                className={`${colors.bg} ${colors.border} border-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-55 w-56 flex flex-col items-center p-4`} // Smaller card size
              >
                {/* Image Container */}
                <div className="w-20 h-20 overflow-hidden rounded-full flex items-center justify-center">
                  {profileObj.profileImage ? (
                    <img
                      className="w-full h-full object-cover"
                      src={profileObj.profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <User className="user-icon" />
                  )}
                </div>

                {/* Text Content */}
                <div className="text-center mt-4">
                  <h3 className="text-l font-semibold text-gray-800">
                    {profileObj.name}
                  </h3>
                  <p className="text-sm text-gray-600">{profileObj.place}</p>
                </div>

                {/* Button */}
                <div className="mt-4">
                  <NavLink to={`/teams/${id}/profile/${profileObj.id}`}>
                    <button className="px-4 py-2 bg-transparent border border-gray-400 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors duration-300 shadow-sm">
                      View Profile
                    </button>
                  </NavLink>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MembersPage;
