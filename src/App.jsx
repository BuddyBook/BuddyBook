import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import MembersPage from "./pages/MembersPage";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPAge";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {

  const [currentTeam, setCurrentTeam] = useState("");


  const handleTeamCreated = (teamId, teamName) => {
    setCurrentTeam({ teamId, teamName });
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category" element={<CategoryPage handleTeamCreated={handleTeamCreated} /> }/>
        <Route path="/category/:categoryId" element={<MembersPage teamId={currentTeam.teamId} teamName={currentTeam.teamName}/> }/>
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
