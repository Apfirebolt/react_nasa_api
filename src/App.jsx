import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./screens/Home";

// lazy imports for code splitting
const Missions = lazy(() => import("./screens/Missions"));
const MissionDetail = lazy(() => import("./screens/MissionDetail"));
const Spaceship = lazy(() => import("./screens/Spaceship"));
const SpaceshipDetail = lazy(() => import("./screens/SpaceshipDetail"));
const Capsules = lazy(() => import("./screens/Capsules"));
const Cores = lazy(() => import("./screens/Cores"));
const Payloads = lazy(() => import("./screens/Payloads"));
const Rockets = lazy(() => import("./screens/Rocket"));
const Dragons = lazy(() => import("./screens/Dragons"));
const History = lazy(() => import("./screens/History"));
const LandingPad = lazy(() => import("./screens/LandingPads"));

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} exact />
          <Route path="/missions" element={<Missions/>} />
          <Route path="/missions/:id" element={<MissionDetail/>} />
          <Route path="/spaceship" element={<Spaceship/>} />
          <Route path="/spaceship/:id" element={<SpaceshipDetail/>} />
          <Route path="/capsules" element={<Capsules/>} />
          <Route path="/cores" element={<Cores/>} />
          <Route path="/payloads" element={<Payloads/>} />
          <Route path="/rockets" element={<Rockets/>} />
          <Route path="/dragons" element={<Dragons/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/landpads" element={<LandingPad/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
