import "../pages/CreateProfilePage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

function EditProfilePage() {
  const { teamId, profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    place: "",
    age: "",
    hobbies: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
  });

  const [imageBase64, setImageBase64] = useState(null);

  // Fetch existing profile when component loads
  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${teamId}/members/${profileId}.json`)
      .then((response) => {
        setProfile(response.data);
        // Keep the existing image
      })
      .catch((error) => console.error("Error fetching profile", error));
  }, [profileId, teamId]);

  // Convert image to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImageBase64(reader.result);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProfile = { ...profile, profileImage: imageBase64 };

    try {
      await axios.put(
        `${API_URL}/teams/${teamId}/members/${profileId}.json`,
        updatedProfile
      );
      console.log("Profile updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="p-10">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Edit Your Profile</h2>
        <input
          className="input"
          name="name"
          type="text"
          value={profile.name}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="place"
          type="text"
          value={profile.place}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="age"
          type="number"
          value={profile.age}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="hobbies"
          type="text"
          value={profile.hobbies}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imageBase64 && (
          <img
            src={imageBase64}
            alt="Profile Preview"
            className="mt-2 rounded w-24 h-24"
          />
        )}
        <button className="button-confirm" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;
