import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const GlobalContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const GlobalContextProvider = ({ children }) => {
  // Use Auth0 SDK directly — no more backend check-auth call
  const {
    user,
    isAuthenticated,
    isLoading: auth0Loading,
  } = useAuth0();

  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  // Input states
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
  const [salaryType, setSalaryType] = useState("Year");
  const [negotiable, setNegotiable] = useState(false);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);

  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });

  // Get user profile from your backend
  const getUserProfile = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);
      setUserProfile(res.data);
    } catch (error) {
      console.log("Error getting user profile", error);
    }
  };

  // Fetch profile once Auth0 confirms user is logged in
  useEffect(() => {
    if (!auth0Loading && isAuthenticated && user) {
      getUserProfile(user.sub);
    }
  }, [isAuthenticated, user, auth0Loading]);

  // Handle input changes
  const handleTitleChange = (e) => {
    setJobTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value.trimStart());
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  // Reset form
  const resetJobForm = () => {
    setJobTitle("");
    setJobDescription("");
    setSalary(0);
    setActiveEmploymentTypes([]);
    setSalaryType("Year");
    setNegotiable(false);
    setTags([]);
    setSkills([]);
    setLocation({
      country: "",
      city: "",
      address: "",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        auth0User: user,       // renamed for backward compat with rest of your app
        userProfile,
        getUserProfile,
        loading: auth0Loading || loading,

        jobTitle,
        jobDescription,
        salary,
        activeEmploymentTypes,
        salaryType,
        negotiable,
        tags,
        skills,
        location,

        handleTitleChange,
        handleDescriptionChange,
        handleSalaryChange,

        setActiveEmploymentTypes,
        setJobDescription,
        setSalaryType,
        setNegotiable,
        setTags,
        setSkills,
        setLocation,

        resetJobForm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};