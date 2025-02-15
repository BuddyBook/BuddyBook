import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CategoryPage({ onTeamCreated }) {
  const [teamName, setTeamName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
  const [teams, setTeams] = useState([]);
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
    <div>
      <h1>CategoryPage</h1>
      
      <div className="teams-list">
        <h2>Existing Teams</h2>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <h3>{team.teamName}</h3>
              <p>Created by: {team.createdBy}</p>
              <button onClick={() => navigate(`/category/${team.id}`)}>
                View Members
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="min-h-screen bg-gradient-to-r from-pastelPink via-pastelBlue to-pastelGreen flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl border-4 border-pastelYellow max-w-md w-full">
          <h1 className="text-4xl font-handwriting text-center text-vibrantPurple mb-6">
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;