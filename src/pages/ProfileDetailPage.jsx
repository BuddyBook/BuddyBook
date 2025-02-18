import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { Trash2, ArrowBigLeft, UserPen } from "lucide-react";
import ReactionButtons from "../components/ReactionButtons";

import dummyImage from "../assets/images/dummy-profile-image.png";
import Loader from "../components/Loader";
import "./ProfileDetailPage.css";

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
      .then((response) => {
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
    <div className="profile-page">

      <ReactionButtons />

      <div className="profile-header">
        <img
          src={profile.profileImage ? profile.profileImage : dummyImage}
          alt="Profile"
          className="profile-image"
        />

        <div className="profile-info">
          <h1>Name: {profile.name}</h1>
          <h1>Age: {profile.age}</h1>
          <h2>Country: {profile.place}</h2>
          <h2>Hobbies: {profile.hobbies}</h2>
        </div>
      </div>

      <div className="profile-questions">
        <h2>My Questions</h2>
        <div className="question-box">
          <p>{profile.question1}</p>
          {/* Other questions*/}
        </div>
      </div>

      <div className="confession-box">
        <p>Confession Box</p>
      </div>

      <div className="button-container">
        <button className="text-red-500" onClick={handleDelete}>
          <Trash2 />
        </button>
        <NavLink to={`/teams/${teamId}/members/${profileId}/edit`}>
          <button ><UserPen/></button>
        </NavLink>
        <button onClick={() => navigate(-1)}>
        <ArrowBigLeft/>
        </button>
      </div>
    </div>
  );
}
export default Profile;
