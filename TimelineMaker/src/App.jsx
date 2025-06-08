import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Timelines from "./pages/timelines";
import TimelinePage from "./pages/TimelinePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timelines" element={<Timelines />} />
        <Route path="/timeline/:timelineId" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App