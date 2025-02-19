import "../pages/CreateProfilePage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

function EditProfilePage() {
  const { teamId, profileId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    place: "",
    age: "",
    hobbies: "",
    linkedIn: "",
    question1: "",
    question2: "",
    customQuestions: "",
  });

  const [image, setImage] = useState(null);

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
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/upload`,
          formData
        );
        // After successful upload, store the image URL
        setImage(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/teams/${teamId}/profile/${profileId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProfile = { ...profile, profileImage: image };

    try {
      await axios.put(
        `${API_URL}/teams/${teamId}/members/${profileId}.json`,
        updatedProfile
      );
      console.log("Profile updated successfully");
      navigate(`/teams/${teamId}/profile/${profileId}`);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!profile) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center text-center p-6">
      {/* Back Button */}
      <BackButton
        text="Back to Team"
        to={`/teams/${teamId}/profile/${profileId}`}
      />

      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="new-profile-title">
            <h2>
              <span>Edit your profile 😎</span>
            </h2>
          </div>
          <div className="flex justify-evenly flex-wrap gap-35">
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">Hey, what’s your name?</label>
                <input
                  className="input"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Where are you based?</label>
                <input
                  className="input"
                  name="place"
                  type="text"
                  value={profile.place}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  How many years young are you?
                </label>
                <input
                  className="input"
                  name="age"
                  type="number"
                  value={profile.age}
                  min="0"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got any fun hobbies?</label>
                <input
                  className="input"
                  name="hobbies"
                  type="text"
                  value={profile.hobbies}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got a LinkedIn?</label>
                <input
                  className="input"
                  name="linkedIn"
                  type="text"
                  value={profile.linkedIn}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* right side container */}
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">
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
                <label className="text-center">
                  If your life had a theme song, what would it be?
                </label>
                <input
                  className="input"
                  name="question2"
                  type="text"
                  value={profile.question2}
                  onChange={handleChange}
                />
              </div>

              <div>
                {profile.customQuestions &&
                  profile.customQuestions.map((question, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="text-center">
                        Custom Question #{index + 1}
                      </label>
                      <input
                        className="input"
                        name={`customQuestion-${index}`}
                        type="text"
                        value={question}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
              </div>

              <div className="flex flex-col">
                <label className="text-center">Upload your picture</label>

                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {/* Image Preview */}
                {image && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={image}
                      alt="my cloudinary image"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="button-confirm">Update</button>
          <button
            className="button-confirm"
            type="submit"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
