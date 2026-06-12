import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MyJob from "../components/JobItem/MyJob";

import { useGlobalContext } from "../context/GlobalContext";
import { useJobsContext } from "../context/JobsContext";

import { useAuth0 } from "@auth0/auth0-react";

function MyJobs() {
  const { userJobs, jobs } =
    useJobsContext();

  const {
    isAuthenticated,
    loading,
    userProfile,
  } = useGlobalContext();

  const { loginWithRedirect } =
    useAuth0();

  const [activeTab, setActiveTab] =
    useState("posts");

  const userId = userProfile?._id;

  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [
    loading,
    isAuthenticated,
    loginWithRedirect,
  ]);

  const likedJobs = jobs.filter(
    (job) => {
      return job.likes.includes(userId);
    }
  );

  if (loading) {
    return null;
  }

  return (
    <div>
      <Header />

      <div className="mt-8 w-[90%] mx-auto flex flex-col">
        <div className="self-center flex items-center gap-6">
          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium
            ${
              activeTab === "posts"
                ? "border-transparent bg-[#7263F3] text-white"
                : "border-gray-400"
            }`}
            onClick={() =>
              setActiveTab("posts")
            }
          >
            My Job Posts
          </button>

          <button
            className={`border border-gray-400 px-8 py-2 rounded-full font-medium
            ${
              activeTab === "likes"
                ? "border-transparent bg-[#7263F3] text-white"
                : "border-gray-400"
            }`}
            onClick={() =>
              setActiveTab("likes")
            }
          >
            Liked Jobs
          </button>
        </div>

        {activeTab === "posts" &&
          userJobs.length === 0 && (
            <div className="mt-8 flex items-center">
              <p className="text-2xl font-bold">
                No job posts found.
              </p>
            </div>
          )}

        {activeTab === "likes" &&
          likedJobs.length === 0 && (
            <div className="mt-8 flex items-center">
              <p className="text-2xl font-bold">
                No liked jobs found.
              </p>
            </div>
          )}

        <div className="my-8 grid grid-cols-2 gap-6">
          {activeTab === "posts" &&
            userJobs.map((job) => (
              <MyJob
                key={job._id}
                job={job}
              />
            ))}

          {activeTab === "likes" &&
            likedJobs.map((job) => (
              <MyJob
                key={job._id}
                job={job}
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyJobs;