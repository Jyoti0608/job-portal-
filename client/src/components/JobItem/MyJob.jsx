import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Pencil, Trash } from "lucide-react";

import { useJobsContext } from "../../context/JobsContext";
import { useGlobalContext } from "../../context/GlobalContext";

import { CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { formatDates } from "../../utils/formatDates";

import {
  bookmark,
  bookmarkEmpty,
} from "../../utils/Icons";

import { useAuth0 } from "@auth0/auth0-react";

function MyJob({ job }) {
  const { deleteJob, likeJob } = useJobsContext();

  const { userProfile, isAuthenticated } = useGlobalContext();

  const { loginWithRedirect } = useAuth0();

  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  const handleLike = (id) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  // Only check like status - don't overwrite userProfile
  useEffect(() => {
    if (userProfile?._id) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job.likes, userProfile]);

  return (
    <div className="p-8 bg-white rounded-xl flex flex-col gap-5">
      <div className="flex justify-between">
        <div
          className="flex items-center space-x-4 mb-2 cursor-pointer"
          onClick={() => navigate(`/job/${job._id}`)}
        >
          <img
            alt="logo"
            src={job.createdBy.profilePicture || "/user.png"}
            className="w-12 h-12 rounded-full shadow-sm object-cover"
          />

          <div>
            <CardTitle className="text-xl font-bold truncate">
              {job.title}
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {job.createdBy.name}
            </p>
          </div>
        </div>

        <button
          className={`text-2xl ${isLiked ? "text-[#7263f3]" : "text-gray-400"}`}
          onClick={() => {
            isAuthenticated ? handleLike(job._id) : loginWithRedirect();
          }}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">
          {job.location}
        </p>

        <p className="text-sm text-muted-foreground mb-4">
          Posted {formatDates(job.createdAt)}
        </p>

        <div className="flex justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {job.createdBy._id === userProfile?._id && (
            <div className="self-end">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Pencil size={14} />
                <span className="sr-only">Edit job</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-500"
                onClick={() => deleteJob(job._id)}
              >
                <Trash size={14} />
                <span className="sr-only">Delete job</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJob;