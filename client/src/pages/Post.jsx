import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import JobForm from "../components/JobPost/JobForm";

import { useGlobalContext } from "../context/GlobalContext";

function Post() {
  const { isAuthenticated, loading } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      (window.location.href = "http://localhost:3000/login");
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <div className="flex flex-col">
      <Header />

      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Create a Job Post
      </h2>

      <div className="flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center">
        <JobForm />
      </div>
    </div>
  );
}

export default Post;