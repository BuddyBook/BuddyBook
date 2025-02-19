import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useParams } from "react-router-dom";

function ReactionButtons() {
const {teamId} = useParams()
const {profileId} = useParams()

  const [counts, setCounts] = useState({
    heart: 0,
    cheer: 0,
    celebrate: 0,
    appreciate: 0,
    smile: 0,
  });

  const handleReaction = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));

  axios.post(
    `${API_URL}/teams/${teamId}/members/${profileId}/reactions.json`,
        {
        type: type,
        count: counts[type] + 1,
        },
    )
      .then((response) => {
        console.log("Reaction updated", response.data);
      })

      .catch((e) => console.log("Error updating reactions", e)); 
};

  const reactions = [
    { emoji: "👏🏻", label: "Cheer", type: "cheer" },
    { emoji: "🩷", label: "Heart", type: "heart" },
    { emoji: "🎉", label: "Celebrate", type: "celebrate" },
    { emoji: "😊", label: "Smile", type: "smile" },
    { emoji: "✨", label: "Appreciate", type: "appreciate" },
  ];

  return (
    <div className="flex justify-center mt-5">
      <div className="flex justify-center items-center text-xl shadow-xl z-10 bg-white gap-1.5 p-1 pl-0.5 pr-1 rounded-xl">
        {reactions.map((reaction, index) => (
          <button
            key={index}
            onClick={() => handleReaction(reaction.type)}
            className="before:hidden hover:before:flex before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:content-[attr(data-label)] before:bg-gray-800 before:text-white before:bg-opacity-50 before:absolute before:-top-6 before:rounded-lg hover:-translate-y-2 cursor-pointer hover:scale-110 bg-white rounded-full p-2 px-3"
            data-label={reaction.label}
          >
            {reaction.emoji} {counts[reaction.type]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReactionButtons;
