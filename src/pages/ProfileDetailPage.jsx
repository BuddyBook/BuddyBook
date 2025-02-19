import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { Trash2, UserPen } from "lucide-react";
import ReactionButtons from "../components/ReactionButtons";

import dummyImage from "../assets/images/dummy-profile-image.png";
import Loader from "../components/Loader";
import "./ProfileDetailPage.css";
import BackButton from "../components/BackButton";
import CustomAnswer from "../components/CustomAnswer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";

function Profile() {
  const { profileId } = useParams();
  const { teamId } = useParams();
  const [profile, setProfile] = useState(null);

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const getProfile = () => {
    axios
      .get(`${API_URL}/teams/${teamId}/members/${profileId}.json`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    getProfile();
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

  console.log(profile);

  return (
    <div className="profile-page p-4 md:p-8">
      <div className="flex justify-between items-center mb-4 mt-2">
        <BackButton text="Back to Profiles" to={`/teams/${teamId}`} />
        <div className="flex gap-5 space-x-2 hover:pointer mb-1">
          <NavLink to={`/teams/${teamId}/members/${profileId}/edit`}>
            <button>
              <UserPen size={25} />
            </button>
          </NavLink>
          <button className="text-red-500" onClick={handleDelete}>
            <Trash2 size={25} />
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
            <h2>Question 1</h2>
            <div className="question-box">
              <p>{profile.question1}</p>
              {/* Other questions */}
            </div>
          </div>

          <div className="profile-questions">
            <h2>Question 2</h2>
            <div className="question-box">
              <p>{profile.question2}</p>
            </div>
          </div>

          <div className="profile-questions">
            <h2>{profile.customQuestion}</h2>
            <div className="question-box">
              <CustomAnswer
                teamId={teamId}
                profileId={profileId}
                user={user}
                onRefresh={() => getProfile()}
              />
              <div>
                {profile.customAnswers &&
                  Object.keys(profile.customAnswers).map((key) => {
                    return (
                      <div key={key}>
                        <p>{profile.customAnswers[key].answer}</p>
                        <p>{profile.customAnswers[key].name}</p>
                      </div>
                    );
                  })}
              </div>
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
