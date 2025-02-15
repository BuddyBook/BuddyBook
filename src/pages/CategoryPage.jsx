import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CategoryPage({ onTeamCreated }) {
  const [teamName, setTeamName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://buddybook-e6cd7-default-rtdb.europe-west1.firebasedatabase.app/resource.json')
      .then((response) => {
        const teamsObject = response.data;
        const teamsArr = Object.keys(teamsObject).map((id) => ({
          id,
          ...teamsObject[id],
        }));
        setTeams(teamsArr);
      })
      .catch((error) => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const teamData = {
      teamName,
      timestamp,
      createdBy,
    };

    axios
      .post(
        'https://buddybook-e6cd7-default-rtdb.europe-west1.firebasedatabase.app/resource.json',
        teamData
      )
      .then((response) => {
        const teamId = response.data.name;
        onTeamCreated(teamId, teamName);
        navigate(`/category/${teamId}`);
      })
      .catch((error) => {
        console.error('Error creating team:', error);
        alert('Failed to create team. Please try again.');
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Category Page</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New Team
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white p-4 rounded-lg shadow-md border">
            <h3 className="text-xl font-bold text-vibrantPurple">{team.teamName}</h3>
            <p>Created by: {team.createdBy}</p>
            <button
              onClick={() => navigate(`/category/${team.id}`)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
              View Members
            </button>
          </div>
        ))}
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

export default CategoryPage;