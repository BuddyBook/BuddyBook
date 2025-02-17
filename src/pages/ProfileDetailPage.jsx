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

  return (
    <div>
      <h1 className="text-2xl">This is profile page</h1>
      <h1>Profile name : {profile.name}</h1>
    </div>
  );
}
export default Profile;
