import axios from "axios";
import { API_URL } from "../config/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Trash2, Settings, BookOpen, Pencil, Smile } from "lucide-react"; // Import icons

import "../pages/TeamsPage.css";
import Loader from "../components/Loader";

function TeamsPage() {
  const [teams, setTeams] = useState(null);
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

    if (editingTeam) {
      axios
        .get(`${API_URL}/teams/${editingTeam}.json`)
        .then((response) => {
          const existingData = response.data;

          const teamData = {
            ...existingData, // Retain existing members and other data
            teamName,
            createdBy,
          };

          return axios.put(`${API_URL}/teams/${editingTeam}.json`, teamData);
        })
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
      const teamData = {
        teamName,
        timestamp: editingTeam ? timestamp : new Date().toLocaleString(),
        createdBy,
      };

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

  const colorSets = [
    {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      icon: "text-yellow-400",
    },
    {
      bg: "bg-purple-100",
      border: "border-purple-200",
      icon: "text-purple-400",
    },
    {
      bg: "bg-orange-100",
      border: "border-orange-200",
      icon: "text-orange-400",
    },
    { bg: "bg-pink-100", border: "border-pink-200", icon: "text-pink-400" },
    { bg: "bg-blue-100", border: "border-blue-200", icon: "text-blue-400" },
    { bg: "bg-green-100", border: "border-green-200", icon: "text-green-400" },
  ];

  if (teams === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 mt-4">
          Teams Page
        </h1>

        {!showModal && (
          <button
            onClick={() => {
              setTeamName("");
              setCreatedBy("");
              setEditingTeam(null);
              setShowModal(true);
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mb-8 transition duration-300 shadow-md"
          >
            Create New Team
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => {
            const colors = colorSets[index % colorSets.length]; // Use modulo for color cycling
            return (
              <div
                key={team.id}
                className={`rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden ${colors.bg} ${colors.border}`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
                <div className="flex justify-center mb-4 relative z-10">
                  <Users className={`w-8 h-8 ${colors.icon}`} />
                </div>
                <h2 className="text-lg font-medium mb-2 text-gray-800 relative z-10">
                  Team: {team.teamName}
                </h2>
                <p className="text-sm mb-4 relative z-10">
                  Created by: {team.createdBy}
                </p>
                <button
                  onClick={() => navigate(`/teams/${team.id}`)}
                  className="text-sm border-1 border-gray-400 hover:text-gray-600 text-black font-bold py-1.5 px-3 rounded-full mb-4 transition duration-300 relative z-10"
                >
                  View Members
                </button>
                <div className="flex justify-center space-x-4 relative z-10">
                  <button
                    onClick={() =>
                      handleEdit(team.id, team.teamName, team.timestamp)
                    }
                    className="text-xs bg-gray-300 hover:bg-gray-500 text-black font-bold py-1 px-3 rounded-full transition duration-300"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(team.id)}
                    className="text-xs bg-red-300 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full transition duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-white flex justify-center items-center">
            <div className="form-new bg-pink-100 p-8 rounded-lg shadow-lg max-w-md w-full relative border-5 border-pink-300">
              <h1 className="text-2xl font-semibold text-center text-pink-600 mb-6">
                {editingTeam ? "Edit Team Name" : "Create New Team"}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-ml font-medium text-gray-700 text-center">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="input  mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
                    required
                  />
                </div>

                {!editingTeam && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      Created By
                    </label>
                    <input
                      type="text"
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      className="input mt-2 p-2 w-full border border-gray-300 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
                      required
                    />

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 text-center">
                        Timestamp
                      </label>
                      <input
                        type="text"
                        placeholder={new Date().toLocaleDateString()}
                        value={timestamp}
                        readOnly
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md bg-gray-100 text-center"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-around mt-6 space-x-4">
                  <button
                    type="submit"
                    className="button-confirm"
                  >
                    {editingTeam ? "Update" : "Create Team"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="button-go-back"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default TeamsPage;
