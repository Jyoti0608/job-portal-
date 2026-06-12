import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "./GlobalContext";

const JobsContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const JobsContextProvider = ({ children }) => {
  const { userProfile, getUserProfile } = useGlobalContext();

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userJobs, setUserJobs] = useState([]);

  const [searchQuery, setSearchQuery] = useState({
    tags: "",
    location: "",
    title: "",
  });

  // Filters
  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    contract: false,
    fullStack: false,
    backend: false,
    devOps: false,
    uiux: false,
  });

  const [minSalary, setMinSalary] = useState(30000);
  const [maxSalary, setMaxSalary] = useState(120000);

  // Get all jobs
  const getJobs = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/v1/jobs");

      setJobs(res.data);
    } catch (error) {
      console.log("Error getting jobs", error);
    } finally {
      setLoading(false);
    }
  };

  // Create job
  const createJob = async (jobData) => {
    try {
      const res = await axios.post("/api/v1/jobs", jobData);

      toast.success("Job created successfully");

      setJobs((prevJobs) => [res.data, ...prevJobs]);

      // Update user jobs
      if (userProfile._id) {
        setUserJobs((prevJobs) => [res.data, ...prevJobs]);

        await getUserJobs(userProfile._id);
      }

      await getJobs();

      // Redirect to job details page
      navigate(`/job/${res.data._id}`);
    } catch (error) {
      console.log("Error creating job", error);
    }
  };

  // Get jobs created by user
  const getUserJobs = async (userId) => {
    setLoading(true);

    try {
      const res = await axios.get(
        "/api/v1/jobs/user/" + userId
      );

      setUserJobs(res.data);
    } catch (error) {
      console.log("Error getting user jobs", error);
    } finally {
      setLoading(false);
    }
  };

  // Search jobs
  const searchJobs = async (tags, location, title) => {
    setLoading(true);

    try {
      const query = new URLSearchParams();

      if (tags) query.append("tags", tags);

      if (location) query.append("location", location);

      if (title) query.append("title", title);

      const res = await axios.get(
        `/api/v1/jobs/search?${query.toString()}`
      );

      setJobs(res.data);
    } catch (error) {
      console.log("Error searching jobs", error);
    } finally {
      setLoading(false);
    }
  };

  // Get job by ID
  const getJobById = async (id) => {
    setLoading(true);

    try {
      const res = await axios.get(`/api/v1/jobs/${id}`);

      return res.data;
    } catch (error) {
      console.log("Error getting job by id", error);
    } finally {
      setLoading(false);
    }
  };

  // Like job
  const likeJob = async (jobId) => {
    try {
      await axios.put(`/api/v1/jobs/like/${jobId}`);

      toast.success("Job liked successfully");

      getJobs();
    } catch (error) {
      console.log("Error liking job", error);
    }
  };

  // Apply to job
  const applyToJob = async (jobId) => {
    const job = jobs.find((job) => job._id === jobId);

    if (job && job.applicants.includes(userProfile._id)) {
      toast.error("You have already applied to this job");

      return;
    }

    try {
      await axios.put(`/api/v1/jobs/apply/${jobId}`);

      toast.success("Applied to job successfully");

      getJobs();
    } catch (error) {
      console.log("Error applying to job", error);

      toast.error(error.response.data.message);
    }
  };

  // Delete job
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/v1/jobs/${jobId}`);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );

      setUserJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );

      toast.success("Job deleted successfully");
    } catch (error) {
      console.log("Error deleting job", error);
    }
  };

  // Search input change
  const handleSearchChange = (searchName, value) => {
    setSearchQuery((prev) => ({
      ...prev,
      [searchName]: value,
    }));
  };

  // Filter change
  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (userProfile._id) {
      getUserJobs(userProfile._id);

      getUserProfile(userProfile.auth0Id);
    }
  }, [userProfile._id]);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        createJob,
        userJobs,
        searchJobs,
        getJobById,
        likeJob,
        applyToJob,
        deleteJob,

        handleSearchChange,
        searchQuery,
        setSearchQuery,

        handleFilterChange,
        filters,
        setFilters,

        minSalary,
        setMinSalary,

        maxSalary,
        setMaxSalary,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export const useJobsContext = () => {
  return useContext(JobsContext);
};