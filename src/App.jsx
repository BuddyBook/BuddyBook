import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TeamsPage from "./pages/TeamsPage";
import MembersPage from "./pages/MembersPage";
import Profile from "./pages/ProfileDetailPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateProfilePage from "./pages/CreateProfilePage";
import About from "./pages/AboutPage";
import EditDetailsPage from "./pages/EditDetailsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <TeamsPage />
            </PrivateRoute>
          }
        />
        <Route path="/teams/:id" element={<MembersPage />} />
        <Route path="/profile/create/:teamId" element={<CreateProfilePage />} />
        <Route path="/teams/:teamId/profile/:profileId" element={<Profile />} />
        <Route
          path="/teams/:teamId/members/:profileId/edit"
          element={<EditDetailsPage />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
