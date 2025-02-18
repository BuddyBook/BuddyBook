import "../pages/CreateProfilePage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { useState } from "react";

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
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
    } = event.target.elements;

    const newProfile = {
      name: name.value,
      place: place.value,
      age: age.value,
      hobbies: hobbies.value,
      question1: question1.value,
      question2: question2.value,
      question3: question3.value,
      question4: question4.value,
      question5: question5.value,
      question6: question6.value,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50 flex flex-col justify-center items-center text-center p-6">
      <form className="form" onSubmit={handleSubmit}>
        <div className="new-profile-title">
          <h2>
            <span>Create your profile 😎</span>
          </h2>
        </div>
        <div className="flex justify-evenly flex-wrap gap-35">
          <div className="flex flex-col gap-15 w-2xs">
            <div className="flex flex-col">
              <label className="text-left">Name</label>
              <input className="input" name="name" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">Where are you from</label>
              <input className="input" name="place" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">Age</label>
              <input className="input" name="age" type="number" min="0" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">What are your Hobbies</label>
              <input className="input" name="hobbies" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If this course had a mascot, what would it be?
              </label>
              <input className="input" name="question1" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                You wake up in a video game world—what game is it, and what's
                your first move?
              </label>
              <input className="input" name="question2" type="text" />
            </div>
          </div>

          {/* right side container */}
          <div className="flex flex-col gap-15 w-2xs">
            <div className="flex flex-col">
              <label className="text-left">
                If you had to survive a zombie apocalypse with only three items,
                what would you choose?
              </label>
              <input className="input" name="question3" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If you could form a team with three fictional characters to save
                the world, who would you choose?
              </label>
              <input className="input" name="question4" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If your life had a theme song that played whenever you entered a
                room, what would it be?
              </label>
              <input className="input" name="question5" type="text" />
            </div>

            <div className="flex flex-col">
              <label className="text-left">
                If your pet could talk, what’s the first thing it would say to
                you?
              </label>
              <input className="input" name="question6" type="text" />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Upload your picture</label>
              {/* TODO work on pushing the img to the API to render it */}
              <input
                className="input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <button className="button-confirm">Let's go</button>
        <button className="button-go-back">Go Back</button>
      </form>
    </div>
  );
}
export default CreateProfilePage;
