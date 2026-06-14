import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";

function JobSummary() {
  const {
    jobTitle,
    jobDescription,
    salary,
    salaryType,
    activeEmploymentTypes,
    negotiable,
    tags,
    skills,
    location,
  } = useGlobalContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-700">Job Summary</h2>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Job Title</h3>
        <p className="text-gray-500">{jobTitle || "Not provided"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Description</h3>
        <p className="text-gray-500">{jobDescription || "Not provided"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Employment Type</h3>
        <div className="flex gap-2 flex-wrap">
          {activeEmploymentTypes.length > 0
            ? activeEmploymentTypes.map((type, i) => (
                <span key={i} className="px-3 py-1 bg-[#7263F3]/10 text-[#7263F3] rounded-full text-sm">
                  {type}
                </span>
              ))
            : <p className="text-gray-500">Not provided</p>
          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Salary</h3>
        <p className="text-gray-500">
          {salary > 0 ? `$${salary} / ${salaryType}` : "Not provided"}
          {negotiable && " (Negotiable)"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Location</h3>
        <p className="text-gray-500">
          {location.address || location.city || location.country
            ? `${location.address ? location.address + ", " : ""}${location.city ? location.city + ", " : ""}${location.country}`
            : "Not provided"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Skills</h3>
        <div className="flex gap-2 flex-wrap">
          {skills.length > 0
            ? skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-[#7263F3]/10 text-[#7263F3] rounded-full text-sm">
                  {skill}
                </span>
              ))
            : <p className="text-gray-500">Not provided</p>
          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">Tags</h3>
        <div className="flex gap-2 flex-wrap">
          {tags.length > 0
            ? tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {tag}
                </span>
              ))
            : <p className="text-gray-500">Not provided</p>
          }
        </div>
      </div>
    </div>
  );
}

export default JobSummary;