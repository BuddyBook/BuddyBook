import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TeamsPage from "./pages/TeamsPage";
import MembersPage from "./pages/MembersPage";
import Profile from "./pages/ProfileDetailPage";
import ErrorPage from "./pages/ErrorPAge";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import CreateProfilePage from "./pages/CreateProfilePage";
import About from "./pages/AboutPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/teams"
          element={
            <>
              <Navbar />
              <TeamsPage />
            </>
          }
        />
        <Route path="/teams/:id" element={<MembersPage />} />
        <Route path="/profile/create/:teamId" element={<CreateProfilePage />} />
        <Route path="/teams/:teamId/profile/:profileId" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
