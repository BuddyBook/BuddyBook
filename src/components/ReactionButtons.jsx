import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useParams } from "react-router-dom";

function ReactionButtons() {
  const { teamId, profileId } = useParams();

  const reactions = [
    { emoji: "👏🏻", label: "Cheer", type: "cheer" },
    { emoji: "❤️", label: "Heart", type: "heart" },
    { emoji: "🎉", label: "Celebrate", type: "celebrate" },
    { emoji: "😊", label: "Smile", type: "smile" },
    { emoji: "✨", label: "Appreciate", type: "appreciate" },
  ];

  const [counts, setCounts] = useState({
    heart: { id: null, count: 0 },
    cheer: { id: null, count: 0 },
    celebrate: { id: null, count: 0 },
    appreciate: { id: null, count: 0 },
    smile: { id: null, count: 0 },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${teamId}/members/${profileId}/reactions.json`)
      .then((response) => {
        if (response.data) {
          const updatedCounts = {};

          Object.entries(response.data).forEach(([type, data]) => {
            const entry = Object.entries(data)[0];
            if (entry) {
              const [id, details] = entry;
              updatedCounts[type] = { id, count: details.count };
            }
          });

          setCounts((prev) => ({ ...prev, ...updatedCounts }));
        }
      })
      .catch((error) => {
        console.error("Error fetching reactions", error);
      });
  }, [teamId, profileId]);

  const handleReaction = (type) => {
    const current = counts[type];
    const newCount = (current?.count || 0) + 1;

    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: { ...current, count: newCount },
    }));

    const reactionUrl = `${API_URL}/teams/${teamId}/members/${profileId}/reactions/${type}/${current.id}.json`;

    axios
      .put(reactionUrl, { count: newCount })
      .then((response) => {
        console.log("Reaction updated", response.data);
      })
      .catch((e) => console.log("Error updating reactions", e));
  };

  return (
    <div className="flex justify-center mt-0 mb-4">
      <div className="flex justify-center items-center text-xl shadow-xl z-10 bg-white gap-1.5 p-1 pl-0.5 pr-1 rounded-xl">
        {reactions.map((reaction, index) => (
          <button
            key={index}
            onClick={() => handleReaction(reaction.type)}
            className="before:hidden hover:before:flex before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:content-[attr(data-label)] before:bg-gray-800 before:text-white before:bg-opacity-50 before:absolute before:-top-6 before:rounded-lg hover:-translate-y-2 cursor-pointer hover:scale-110 bg-white rounded-full p-2 px-3"
            data-label={reaction.label}
          >
            {reaction.emoji} {counts[reaction.type]?.count || 0}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReactionButtons;
