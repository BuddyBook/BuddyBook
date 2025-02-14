import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import MembersPage from "./pages/MembersPage";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPAge";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element=<Homepage /> />
        <Route path="/category" element=<CategoryPage /> />
        <Route path="/categoryId" element=<MembersPage /> />
        <Route path="/profileId" element=<Profile /> />
        <Route path="/*" element=<ErrorPage /> />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
