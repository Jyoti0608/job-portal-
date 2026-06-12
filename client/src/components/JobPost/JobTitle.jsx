import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../../context/GlobalContext";

import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

function JobTitle() {
  const {
    handleTitleChange,
    jobTitle,
    setActiveEmploymentTypes,
  } = useGlobalContext();

  const [employmentTypes, setEmploymentTypes] =
    useState({
      "Full Time": false,
      "Part Time": false,
      Contract: false,
      Internship: false,
      Temporary: false,
    });

  const handleEmploymentTypeChange = (type) => {
    setEmploymentTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  useEffect(() => {
    const selectedTypes = Object.keys(
      employmentTypes
    ).filter((type) => employmentTypes[type]);

    setActiveEmploymentTypes(selectedTypes);
  }, [employmentTypes, setActiveEmploymentTypes]);

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Job Title
          </h3>

          <Label
            htmlFor="jobTitle"
            className="text-sm text-muted-foreground mt-2"
          >
            A job title is a specific designation of a
            post in an organization.
          </Label>
        </div>

        <Input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={jobTitle}
          onChange={handleTitleChange}
          className="flex-1 w-full mt-2"
          placeholder="Enter Job Title"
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Employment Type
          </h3>

          <p className="text-sm text-muted-foreground mt-2">
              Select the type of employment.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {Object.entries(employmentTypes).map(
            ([type, checked]) => (
              <div
                key={type}
                className="flex items-center space-x-2 border border-input rounded-md p-2"
              >
                <Checkbox
                  id={type}
                  checked={checked}
                  onCheckedChange={() => {
                    handleEmploymentTypeChange(type);
                  }}
                />

                <Label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </Label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default JobTitle;