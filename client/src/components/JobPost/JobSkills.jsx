import React, { useState } from "react";
import { X } from "lucide-react";

import { useGlobalContext } from "../../context/GlobalContext";

import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function JobSkills() {
  const { skills, setSkills, tags, setTags } =
    useGlobalContext();

  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddSkill = () => {
    if (
      newSkill.trim() &&
      !skills.includes(newSkill.trim())
    ) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleAddTag = () => {
    if (
      newTag.trim() &&
      !tags.includes(newTag.trim())
    ) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Skills
          </h3>

          <Label
            htmlFor="skills"
            className="text-sm text-muted-foreground mt-2"
          >
            Add relevant skills for the job position.
          </Label>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              id="skills"
              name="skills"
              value={newSkill}
              onChange={(e) =>
                setNewSkill(e.target.value)
              }
              className="flex-1"
              placeholder="Enter a skill"
            />

            <Button
              type="button"
              onClick={handleAddSkill}
            >
              Add Skill
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-1"
              >
                <span>{skill}</span>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveSkill(skill)
                  }
                  className="text-primary-foreground hover:text-red-500 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            Tags
          </h3>

          <Label
            htmlFor="tags"
            className="text-sm text-muted-foreground mt-2"
          >
            Add relevant tags for the job position.
          </Label>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              id="tags"
              name="tags"
              value={newTag}
              onChange={(e) =>
                setNewTag(e.target.value)
              }
              className="flex-1"
              placeholder="Enter a tag"
            />

            <Button
              type="button"
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center space-x-1"
              >
                <span>{tag}</span>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveTag(tag)
                  }
                  className="text-secondary-foreground hover:text-red-500 focus:outline-none"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSkills;