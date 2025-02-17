import axios from "axios";
import { API_URL } from "../config/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../pages/TeamsPage.css";

function TeamsPage() {
  const [teams, setTeams] = useState([]); // state to store the date fetched from API
  const [teamName, setTeamName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/teams.json`)
      .then((response) => {
        const teamsObject = response.data;

        //to handle null
        if (teamsObject) {
          const teamsArr = Object.keys(teamsObject).map((id) => ({
            id,
            ...teamsObject[id],
          }));

          setTeams(teamsArr);
        }
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  //Form submit

  const handleSubmit = (event) => {
    event.preventDefault();

    const teamData = {
      teamName,
      timestamp,
      createdBy,
    };

    axios
      .post(`${API_URL}/teams.json`, teamData)
      .then((response) => {
        const teamId = response.data.name;

        navigate(`/teams/${teamId}`);
      })
      .catch((error) => {
        console.error("Error creating team:", error);
        alert("Failed to create team. Please try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Category Page</h1>

      <button onClick={() => setShowModal(true)} className="create-button">
        Create New Team
      </button>

      <div className="max-w-2xl mx-auto p-4">
        <div className="flex flex-wrap justify-evenly gap-20">
          {teams.map((team) => (
            <div key={team.id} className="relative">
              {/* Clipboard frame */}
              <div className="w-53 aspect-[9/5] bg-[#d2bc9b] rounded-lg p-1">
                {/* Black clip */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-15 h-2 bg-black rounded-b-lg" />

                {/* Paper content */}
                <div className="h-full bg-white rounded-md p-2 pt-3">
                  {/* Ruled lines background */}

                  <div className="relative">
                    <h2 className="text-sm font-medium mb-0.5">
                      Team name - {team.teamName}
                    </h2>
                    <p className="text-[10px]">Created by: {team.createdBy}</p>
                    <button
                      onClick={() => navigate(`/teams/${team.id}`)}
                      className="view-button"
                    >
                      View Members
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h1 className="text-2xl font-handwriting text-center text-vibrantPurple mb-6">
              Create a Team
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="mt-1 block w-full border-2 border-pastelPink rounded-md shadow-sm focus:ring-vibrantPurple focus:border-vibrantPurple"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Created By
                </label>
                <input
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  className="mt-1 block w-full border-2 border-pastelPink rounded-md shadow-sm focus:ring-vibrantPurple focus:border-vibrantPurple"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Timestamp
                </label>
                <input
                  type="text"
                  value={timestamp}
                  readOnly
                  className="mt-1 block w-full border-2 border-pastelPink rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Create Team
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamsPage;
