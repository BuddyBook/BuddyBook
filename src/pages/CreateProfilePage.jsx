import "../pages/CreateProfilePage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { useState } from "react";
import BackButton from "../components/BackButton";

function CreateProfilePage() {
  const { teamId } = useParams();

  const navigate = useNavigate();

  const [imageBase64, setImageBase64] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageBase64(reader.result); // Store Base64 string
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      place,
      age,
      hobbies,
      linkedIn,
      question1,
      question2,
      customQuestion,
    } = event.target.elements;

    const newProfile = {
      name: name.value,
      place: place.value,
      age: age.value,
      hobbies: hobbies.value,
      linkedIn: linkedIn.value,
      question1: question1.value,
      question2: question2.value,
      customQuestion: customQuestion.value,
      profileImage: imageBase64,
    };

    axios
      .post(`${API_URL}/teams/${teamId}/members.json`, newProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("success");
        navigate(-1);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    console.log(newProfile);
  };

  return (
    <div className="flex flex-col justify-center items-center text-center p-6">
      {/* Back Button */}
      <BackButton text="Back to Team" to={`/teams/${teamId}`} />

      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="new-profile-title">
            <h2>
              <span>Create your profile 😎</span>
            </h2>
          </div>
          <div className="flex justify-evenly flex-wrap gap-35">
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">Hey, what’s your name?</label>
                <input className="input" name="name" type="text" required />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Where are you based?</label>
                <input className="input" name="place" type="text" required />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  How many years young are you?
                </label>
                <input
                  className="input"
                  name="age"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got any fun hobbies?</label>
                <input className="input" name="hobbies" type="text" required />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got a LinkedIn?</label>
                <input className="input" name="linkedIn" type="text" />
              </div>
            </div>

            {/* right side container */}
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">
                  If this course had a mascot, what would it be?
                </label>
                <input className="input" name="question1" type="text" />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  If your life had a theme song, what would it be?
                </label>
                <input className="input" name="question2" type="text" />
              </div>

              {/* Custom Question Section */}
              <div className="flex flex-col gap-15 w-2xs">
                <div className="flex flex-col">
                  <label className="text-center">
                    Create Your Own Question:
                    <input
                      className="input"
                      name="customQuestion"
                      type="text"
                    />
                  </label>
                </div>
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
                {imageBase64 && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={imageBase64}
                      alt="Profile Preview"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="button-confirm">Let's go</button>
        </form>
      </div>
    </div>
  );
}
export default CreateProfilePage;
