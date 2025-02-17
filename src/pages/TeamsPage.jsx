import axios from "axios";
import { API_URL } from "../config/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../pages/TeamsPage.css";

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios
      .get(`${API_URL}/teams.json`)
      .then((response) => {
        const teamsObject = response.data;

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const teamData = {
      teamName,
      timestamp: editingTeam ? timestamp : new Date().toLocaleString(),
      createdBy,
    };

    if (editingTeam) {
      axios
        .put(`${API_URL}/teams/${editingTeam}.json`, { teamName })
        .then(() => {
          fetchTeams();
          setShowModal(false);
          setEditingTeam(null);
        })
        .catch((error) => {
          console.error("Error updating team:", error);
          alert("Failed to update team. Please try again.");
        });
    } else {
      axios
        .post(`${API_URL}/teams.json`, teamData)
        .then((response) => {
          const teamId = response.data.name;
          fetchTeams();
          setShowModal(false);
          navigate(`/teams/${teamId}`);
        })
        .catch((error) => {
          console.error("Error creating team:", error);
          alert("Failed to create team. Please try again.");
        });
    }
  };

  const handleEdit = (id, name) => {
    setEditingTeam(id);
    setTeamName(name);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/teams/${id}.json`)
      .then(() => {
        fetchTeams();
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
        alert("Failed to delete team. Please try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 bg-[#fff4c2]">Teams Page</h1>

      {!showModal && (
        <button onClick={() => {
          setTeamName("");
          setCreatedBy(""); // Reset createdBy field
          setEditingTeam(null);
          setShowModal(true);
        }} className="create-button">
          Create New Team
        </button>
      )}

      <div className="max-w-2xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((team) => (
            <div key={team.id} className="relative w-full bg-[#fff4c2] rounded-lg p-3 shadow-md">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-15 h-2" />
              <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-medium mb-2 text-[#101010d6]">Team Name: {team.teamName}</h2>
                <p className="text-sm mb-4">Created by: {team.createdBy}</p>
                <button
                  onClick={() => navigate(`/teams/${team.id}`)}
                  className="text-sm bg-blue-300 hover:bg-blue-400 text-white font-bold py-1.5 px-3 rounded-full mb-4 transition duration-300"
                >
                  View Members
                </button>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleEdit(team.id, team.teamName)}
                    className="text-xs bg-gray-300 hover:bg-gray-500 text-black font-bold py-1 px-3 rounded-full transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="text-xs bg-red-300 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-semibold text-center text-purple-600 mb-6">
              {editingTeam ? "Edit Team Name" : "Create New Team"}
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
                  className="mt-4 text-center block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              {!editingTeam && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Created By
                  </label>
                  <input
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    className="mt-4 text-center block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded-full transition duration-300 w-full"
                >
                  {editingTeam ? "Update Team Name" : "Create Team"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="hover:text-red-600 hover:bg-red-100 text-red-400 font-bold py-2 px-6 rounded-full transition duration-300 w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamsPage;