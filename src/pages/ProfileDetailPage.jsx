import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

import dummyImage from "../assets/images/dummy-profile-image.png";

function Profile() {
  const { profileId } = useParams();
  const { teamId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${teamId}/members/${profileId}.json`)
      .then((response) => {
        console.log(response.data);

        setProfile(response.data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, []);

  if (profile === null) {
    return "Loading.....";
  }

  //TODO:
  // add deleting functionality for FULL profile (top right/left on the screen)
  // add editing functionality only on more individual topics (either with the full form OR )

  return (
    <div>
      <h1 className="text-2xl">This is the profile page</h1>
      <section>
        <h1>My name: {profile.name}</h1>
        <h1>My age: {profile.age}</h1>
        <h2>Where I am from: {profile.place}</h2>
        <h2>What my hobbies are: {profile.hobbies}</h2>
      </section>
      <section>
        <img src={profile.profileImage ? profile.profileImage : dummyImage} />
      </section>
      <section>
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Edit
        </button>
      </section>
    </div>
  );
}
export default Profile;
