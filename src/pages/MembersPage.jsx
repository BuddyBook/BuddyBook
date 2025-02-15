import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

import "../pages/MembersPage.css";

function MembersPage() {
  const { id } = useParams();

  const [team, setTeam] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/teams/${id}.json`)
      .then((response) => {
        console.log(response.data);
        const members = response.data.members;

        const profilesArray = Object.keys(members).map((id) => ({
          id,
          ...members[id],
        }));

        setTeam(profilesArray);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  if (team === undefined) {
    return "Loading...";
  }

  return (
    <div>
      <h1>Members Page of : {team.createdBy} </h1>
      <h2>Team Id is : {id} </h2>
      <h2>Team Name : {team.teamName}</h2>

      <div className="flex gap-5 justify-evenly flex-wrap">
        {team.map((profileObj) => {
          return (
            <div key={profileObj.id}>
              <div className="card">
                <div className="content">
                  <div className="back">
                    <div className="back-content">
                      <strong>Hover Me</strong>
                    </div>
                  </div>
                  <div className="front">
                    <div className="img">
                      <div className="circle"></div>
                      <div className="circle" id="right"></div>
                      <div className="circle" id="bottom"></div>
                    </div>

                    <div className="front-content">
                      <small className="badge">Pasta</small>
                      <div className="description">
                        <div className="title">
                          <p className="title">
                            <strong>Spaguetti Bolognese</strong>
                          </p>
                        </div>
                        <p className="card-footer">
                          30 Mins &nbsp; | &nbsp; 1 Serving
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NavLink to={`/profile/create/${id}`}>
        <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Your Profile
        </button>
      </NavLink>
    </div>
  );
}
export default MembersPage;
