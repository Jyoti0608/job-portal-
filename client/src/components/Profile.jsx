import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Settings, LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context/GlobalContext";

import { Badge } from "./ui/badge";

import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { userProfile } = useGlobalContext();

  const navigate = useNavigate();

  const { logout } = useAuth0();

  return (
    <DropdownMenu>
      <div className="flex items-center gap-4">
        <Badge>
          {userProfile?.profession || "User"}
        </Badge>

        <DropdownMenuTrigger
          asChild
          className="cursor-pointer"
        >
          <img
            src={
              userProfile?.profilePicture
                ? userProfile.profilePicture
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
              {userProfile?.name || "User"}
            </p>

            <p className="text-xs leading-none text-muted-foreground">
              {userProfile?.email || "No Email"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Profile;