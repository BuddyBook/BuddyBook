import axios from "axios";
import { API_URL } from "../config/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Trash2, UserPen } from "lucide-react"; // Import icons

import "../pages/TeamsPage.css";
import Loader from "../components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";
import { nanoid } from "nanoid";
import AccessIdDialog from "../components/AccessIdDialog";

function TeamsPage() {
  const [teams, setTeams] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  const [accessId, setAccessId] = useState("");
  const [showAccessIdModel, setShowAccessIdModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState();
  const navigate = useNavigate();

  const [user] = useAuthState(auth); // Fetch current authenticated user

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  //used to populate the created by input field with the user name.

  useEffect(() => {
    if (user) {
      setCreatedBy(user.displayName);
    }
  }, [user]);

  // Function to fetch teams data from the API
  const fetchTeams = () => {
    axios
      .get(`${API_URL}/teams.json`)
      .then((response) => {
        const teamsObject = response.data;
        if (teamsObject) {
          // Convert the object into an array
          const teamsArr = Object.keys(teamsObject).map((id) => ({
            id,
            ...teamsObject[id],
          }));
          setTeams(teamsArr);
        } else {
          setTeams([]); // Set to an empty array if no teams are found
        }
        setLoading(false); // Set loading to false after fetching
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setLoading(false); // Ensure loading is set to false even on error
      });
  };

  // Handle form submission for creating or editing a team
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingTeam) {
      // Update an existing team
      axios
        .get(`${API_URL}/teams/${editingTeam}.json`)
        .then((response) => {
          const existingData = response.data;

          const teamData = {
            ...existingData,
            teamName,
          };

          return axios.put(`${API_URL}/teams/${editingTeam}.json`, teamData);
        })
        .then(() => {
          fetchTeams(); // Refresh the teams list
          setShowModal(false);
          setEditingTeam(null);
        })
        .catch((error) => {
          console.error("Error updating team:", error);
          alert("Failed to update team. Please try again.");
        });
    } else {
      // Create a new team
      const teamData = {
        teamName,
        timestamp: new Date().toLocaleString(),
        createdBy,
        createdByEmail: user.email, //to store the user email
        accessId,
      };

      axios
        .post(`${API_URL}/teams.json`, teamData)
        .then((response) => {
          const teamId = response.data.name; // Get the new team's ID
          fetchTeams(); // Refresh the teams list
          setShowModal(false);
          navigate(`/teams/${teamId}`); // Redirect to the new team's page
        })
        .catch((error) => {
          console.error("Error creating team:", error);
          alert("Failed to create team. Please try again.");
        });
    }
  };

  // Handle team editing
  const handleEdit = (id, name) => {
    setEditingTeam(id);
    setTeamName(name);
    setShowModal(true);
  };

  // Handle team deletion
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

  // Handle access ID validation before navigating to a team page
  const handleAcessOnClose = (input) => {
    setShowAccessIdModal(false);
    if (input && input == selectedTeam.accessId) {
      navigate(`/teams/${selectedTeam.id}`);
    } else {
      alert("The id entered is invalid,please enter correct id");
    }
    setSelectedTeam(undefined);
  };

  // Predefined color sets for styling teams dynamically
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

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Access ID modal for entering the access ID before viewing a team */}
      <AccessIdDialog open={showAccessIdModel} onClose={handleAcessOnClose} />
      <div className="max-w-4xl mx-auto px-4 pb-6 sm:px-6 sm:pb-8">
        <h1 className="text-4xl font-bold text-black drop-shadow-lg mb-4 mt-4">
          Teams Page
        </h1>

        {/* Button to create a new team */}
        {!showModal && (
          <button
            onClick={() => {
              setTeamName("");
              setEditingTeam(null);
              setShowModal(true);
              setAccessId(nanoid(5));
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mb-8 transition duration-300 shadow-md"
          >
            Create New Team
          </button>
        )}

        {/* Display the list of teams if there are any */}
        {teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teams.map((team, index) => {
              const colors = colorSets[index % colorSets.length];
              return (
                <div
                  key={team.id}
                  className={`rounded-lg p-6 border-2 shadow-lg transform transition-all hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden ${colors.bg} ${colors.border}`}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
                  <div className="flex justify-center mb-4 relative z-10">
                    <Users className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h2 className="text-lg font-medium mb-2 text-gray-800 relative z-10">
                    Team: {team.teamName}
                  </h2>
                  <p className="text-sm mb-4 relative z-10 text-gray-600">
                    Created by: {team.createdBy}
                  </p>
                  <p className="text-sm mb-4 relative z-10 text-gray-800">
                    {team.members ? Object.keys(team.members).length : 0}{" "}
                    members
                  </p>
                  <button
                    onClick={() => {
                      setShowAccessIdModal(true);
                      setSelectedTeam(team);
                    }}
                    className="text-sm border-1 border-gray-400 hover:text-gray-600 text-black font-bold py-1.5 px-3 rounded-full mb-4 transition duration-300 relative z-10"
                  >
                    View Team
                  </button>

                  {/* Edit and delete buttons */}
                  <div className="flex justify-center space-x-4 relative z-10">
                    <button
                      onClick={() =>
                        handleEdit(team.id, team.teamName, team.timestamp)
                      }
                      className="text-xs bg-gray-300 hover:bg-gray-500 text-black font-bold py-1 px-3 rounded-full transition duration-300"
                    >
                      <UserPen className="w-4 h-4" />
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
        ) : (
          <p className="text-center text-gray-500 mt-4">No teams available.</p>
        )}

        {/* Modal for creating or editing a team */}
        {showModal && (
          <div className="fixed inset-0 bg-white flex justify-center items-center">
            <div className="form-new bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full relative border-5 border-pink-300">
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
                    className="mt-2 p-2 w-full border-2 border-black bg-gray-100 border-gray-30 rounded-md text-center"
                    required
                  />
                </div>

                {/* Additional fields for creating a new team */}
                {!editingTeam && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      Created By
                    </label>
                    <input
                      type="text"
                      value={createdBy}
                      onChange={(e) => {
                        setCreatedBy(e.target.value);
                      }}
                      className="mt-2 p-2 w-full border-2 border-black bg-gray-100 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
                      required
                    />

                    {/* Display the auto-generated access ID */}
                    <label className="block text-sm font-medium text-gray-700 text-center mt-7">
                      Access Id()
                    </label>
                    <input
                      type="text"
                      value={accessId}
                      readOnly
                      className="mt-2 p-2 w-full border-2 border-black bg-gray-100 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
                      required
                    />

                    {/* Access ID instructions */}
                    <small className="text-red-800 font-bold">
                      Please copy and share only with the people in your team.
                      This is a one-time code, do not lose it.
                    </small>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-around space-x-4">
                  <button type="submit" className="button-confirm">
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
