import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home";
import Finder from "./pages/Finder";
import MyJob from "./pages/MyJob";
import Post from "./pages/Post";
import JobDetails from "./pages/JobDetails";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div style={{display:'flex', justifyContent:'center', marginTop:'2rem'}}>Loading...</div>;

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