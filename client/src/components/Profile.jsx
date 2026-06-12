import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context/GlobalContext";

import { Badge } from "./ui/badge";

function Profile() {
  const { userProfile } = useGlobalContext();

  const {
    profilePicture,
    name,
    profession,
    email,
  } = userProfile;

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <div className="flex items-center gap-4">
        <Badge>{profession}</Badge>

        <DropdownMenuTrigger
          asChild
          className="cursor-pointer"
        >
          <img
            src={
              profilePicture
                ? profilePicture
                : "/user.png"
            }
            alt="avatar"
            className="w-9 h-9 rounded-lg object-cover"
          />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent
        className="w-56"
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {name}
            </p>

            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />

          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            window.location.href =
              "http://localhost:3000/logout";
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />

          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;