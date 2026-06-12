import React from "react";

import { Search, MapPin } from "lucide-react";

import { useJobsContext } from "../context/JobsContext";

function SearchForm() {
  const {
    searchJobs,
    handleSearchChange,
    searchQuery,
  } = useJobsContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        searchJobs(
          searchQuery.tags,
          searchQuery.location,
          searchQuery.title
        );
      }}
      className="
        w-full
        max-w-4xl
        bg-white
        rounded-2xl
        shadow-lg
        p-3
        flex
        items-center
        gap-3
      "
    >
      {/* Job Title */}
      <div className="flex items-center flex-1 px-4">
        <Search
          size={22}
          className="text-gray-400"
        />

        <input
          type="text"
          id="job-title"
          name="title"
          value={searchQuery.title}
          onChange={(e) =>
            handleSearchChange(
              "title",
              e.target.value
            )
          }
          id="jobSearch"
          name="jobSearch"
          placeholder="Job Title or Keywords"
          className="
            w-full
            bg-transparent
            outline-none
            px-3
            py-3
            text-lg
            text-black
            placeholder:text-gray-400
          "
        />
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-gray-200" />

      {/* Location */}
      <div className="flex items-center flex-1 px-4">
        <MapPin
          size={22}
          className="text-gray-400"
        />

        <input
          type="text"
          id="location"
          name="location"
          value={searchQuery.location}
          onChange={(e) =>
            handleSearchChange(
              "location",
              e.target.value
            )
          }
          placeholder="Enter Location"
          className="
            w-full
            bg-transparent
            outline-none
            px-3
            py-3
            text-lg
            text-black
            placeholder:text-gray-400
          "
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="
          bg-[#7263F3]
          hover:bg-[#5d4df0]
          text-white
          px-8
          py-4
          rounded-xl
          font-semibold
          transition-all
          duration-300
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;