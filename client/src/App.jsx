import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Finder from "./pages/Finder";
import MyJob from "./pages/MyJob";
import Post from "./pages/Post";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/finder" element={<Finder />} />
      <Route path="/myjobs" element={<MyJob />} />
      <Route path="/post" element={<Post />} />
      <Route path="/job/:id" element={<JobDetails />} />
    </Routes>
  );
}

export default App;