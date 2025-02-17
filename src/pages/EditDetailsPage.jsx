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

  const handleCancel = () => {
    navigate(-1);
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
        <div className="new-profile-title">
          <h2>
            Welcome,
            <br />
            <span>Create your profile 😎</span>
          </h2>
        </div>
        <div className="flex justify-evenly flex-wrap">
          <div className="flex flex-col gap-7 w-2xs">
            <div className="flex flex-col">
              <label className="text-left">Name</label>
              <input
                className="input"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">Where are you from</label>
              <input
                className="input"
                name="place"
                type="text"
                value={profile.place}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">Age</label>
              <input
                className="input"
                name="age"
                type="number"
                min="0"
                value={profile.age}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">What are your Hobbies</label>
              <input
                className="input"
                name="hobbies"
                type="text"
                value={profile.hobbies}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If this course had a mascot, what would it be?
              </label>
              <input
                className="input"
                name="question1"
                type="text"
                value={profile.question1}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                You wake up in a video game world—what game is it, and what's
                your first move?
              </label>
              <input
                className="input"
                name="question2"
                type="text"
                value={profile.question2}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* right side container */}
          <div className="flex flex-col gap-7 w-2xs">
            <div className="flex flex-col">
              <label className="text-left">
                If you had to survive a zombie apocalypse with only three items,
                what would you choose?
              </label>
              <input
                className="input"
                name="question3"
                type="text"
                value={profile.question3}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If you could form a team with three fictional characters to save
                the world, who would you choose?
              </label>
              <input
                className="input"
                name="question4"
                type="text"
                value={profile.question4}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If your life had a theme song that played whenever you entered a
                room, what would it be?
              </label>
              <input
                className="input"
                name="question5"
                type="text"
                value={profile.question5}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If your pet could talk, what’s the first thing it would say to
                you?
              </label>
              <input
                className="input"
                name="question6"
                type="text"
                value={profile.question6}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Upload your picture</label>
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
              <button
                className="button-confirm"
                type="submit"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
