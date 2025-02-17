import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";

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
      <h1>My name: {profile.name}</h1>
      <h1>My age: {profile.age}</h1>
      <h2>Where I am from: {profile.place}</h2>
      <h2>What my hobbies are: {profile.hobbies}</h2>


    </div>
  );
}
export default Profile;
