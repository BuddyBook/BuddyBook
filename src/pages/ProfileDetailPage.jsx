import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { Trash2, UserPen, Smile, Paperclip, Palmtree } from "lucide-react";
import ReactionButtons from "../components/ReactionButtons";

import dummyImage from "../assets/images/dummy-profile-image.png";
import Loader from "../components/Loader";
import "./ProfileDetailPage.css";
import BackButton from "../components/BackButton";
import CustomAnswer from "../components/CustomAnswer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utility/firebase";
import Comments from "../components/Comments";

function Profile() {
  const { profileId, teamId } = useParams();
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

  return (
    <div className="profile-page p-4 md:p-8">
      <div className="flex justify-between items-center mb-4 mt-2">
        <BackButton text="Back to Profiles" to={`/teams/${teamId}`} />
        <div className="flex gap-5 space-x-2 hover:pointer mb-1">
          <NavLink to={`/teams/${teamId}/members/${profileId}/edit`}>
            <button>
              <UserPen size={25} className="mt-2" />
            </button>
          </NavLink>
          <button className="text-red-500" onClick={handleDelete}>
            <Trash2 size={25} />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-4/5 mx-auto mb-5">
        <h1 className="text-3xl font-bold mb-4">{profile.name}'s Profile</h1>

        <div className="flex flex-col md:flex-row justify-between mb-4">
          {/* Left Block */}
          <div className="flex flex-col items-center md:w-1/2 mb-4 relative group">
            <div className="bg-white p-4 shadow-md rounded-md mb-4 relative group-hover:shadow-[0_0_10px_rgb(255,165,0)] transition duration-300">
              <Paperclip
                className="text-gray-700 absolute top-0 left-0 m-0.5"
                size={50}
              />
              <img
                src={profile.profileImage || dummyImage}
                alt="Profile"
                className="w-64 h-64 object-cover mb-2"
              />
              <div className="flex justify-center items-center text-lg font-semibold gap-3">
                <Smile className="text-orange-300 mt-3" />
                <Palmtree className="text-green-600 mt-2" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-semibold">Name: {profile.name}</h1>
              <h2 className="text-lg">Country: {profile.place}</h2>
              <h2 className="text-lg">Hobbies: {profile.hobbies}</h2>
            </div>
          </div>

          {/* Right Block */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <h1 className="text-xl font-semibold">My answers</h1>
              <h2 className="font-semibold">
                If this course had a mascot, what would it be?
              </h2>
              <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                <p>{profile.question1}</p>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold">
                If your life had a theme song, what would it be?
              </h2>
              <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                <p>{profile.question2}</p>
              </div>
            </div>

            {/* Custom Question Section */}
            <div className="mb-6">
              <h1 className="text-lm font-semibold">
                Add your own answer below 😇
              </h1>
              <h2 className="font-semibold">{profile.customQuestion}</h2>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-">
                <div className="mb-3">
                  {profile.customAnswers &&
                    Object.keys(profile.customAnswers).map((key) => (
                      <div key={key} className="mb-2">
                        <p className="text-sm text-gray-600">
                          {profile.customAnswers[key].name}:{" "}
                          {profile.customAnswers[key].answer}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <CustomAnswer
                    teamId={teamId}
                    profileId={profileId}
                    user={user}
                    onRefresh={() => getProfile()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReactionButtons
        className="reaction-buttons"
        teamId={teamId}
        profileId={profileId}
      />

      <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
        <h2 className="text-xl font-semibold mb-2">Messages from Colleagues</h2>
        <Comments
          teamId={teamId}
          profileId={profileId}
          user={user}
          onRefresh={() => getProfile()}
        />

        <div className="message-box">
          <div>
            {profile.comments &&
              Object.keys(profile.comments).map((key) => {
                return (
                  <div key={key}>
                    <p>{profile.comments[key].comment}</p>
                    <p>{profile.comments[key].name}</p>
                  </div>
                );
              })}

            {/* Reactions and Messages */}
            <div className="mt-5">
              <ReactionButtons
                className="reaction-buttons mb-4"
                teamId={teamId}
                profileId={profileId}
              />
              <div className="bg-orange-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">
                  Messages from Colleagues
                </h2>
                <div className="message-box overflow-y-auto h-64">
                  {/* Messages to be displayed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
