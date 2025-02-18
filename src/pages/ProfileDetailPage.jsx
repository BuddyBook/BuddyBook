import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { Trash2, ArrowBigLeft, UserPen } from "lucide-react";
import ReactionButtons from "../components/ReactionButtons";

import dummyImage from "../assets/images/dummy-profile-image.png";
import Loader from "../components/Loader";
import "./ProfileDetailPage.css";
import BackButton from "../components/backButton";

function Profile() {
  const { profileId } = useParams();
  const { teamId } = useParams();
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${teamId}/members/${profileId}.json`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/teams/${teamId}/members/${profileId}.json`)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  if (profile === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile-page p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <BackButton text="Back to Profiles" to={`/teams/${teamId}`} />
        <div className="flex space-x-2 hover:pointer">
          <NavLink to={`/teams/${teamId}/members/${profileId}/edit`}>
            <button>
              <UserPen />
            </button>
          </NavLink>
          <button className="text-red-500" onClick={handleDelete}>
            <Trash2 />
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <div className="flex flex-col md:flex-row items-start mb-4">
        <img
          src={profile.profileImage || dummyImage}
          alt="Profile"
          className="profile-image mb-4 md:mb-0 md:mr-4"
        />

        <div className="flex-1">
          <div className="profile-info">
            <h1>Name: {profile.name}</h1>
            <h1>Age: {profile.age}</h1>
            <h2>Country: {profile.place}</h2>
            <h2>Hobbies: {profile.hobbies}</h2>
          </div>

          <div className="profile-questions">
            <h2>My Questions</h2>
            <div className="question-box">
              <p>{profile.question1}</p>
              {/* Other questions */}
            </div>
          </div>
        </div>
      </div>

      <ReactionButtons className="reaction-buttons" />

      <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl font-semibold mb-2">Messages from Colleagues</h2>
        <div className="message-box">{/* Messages to be displayed */}</div>
      </div>
    </div>
  );
}

export default Profile;
