import React from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  LogIn,
  UserPlus,
} from "lucide-react";

import { useGlobalContext } from "../context/GlobalContext";

import Profile from "./Profile";

import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { isAuthenticated } =
    useGlobalContext();

  const { loginWithRedirect } =
    useAuth0();

  const location = useLocation();

  const pathname = location.pathname;

  return (
    <header className="px-10 py-6 bg-[#D7DEDC] text-gray-500 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3"
      >
        <img
          src="/logo.svg"
          alt="logo"
          className="
            w-11
            h-11
            object-contain
          "
        />

        <h1
          className="
            font-extrabold
            text-3xl
            text-[#7263f3]
            tracking-tight
          "
        >
          JobStart
        </h1>
      </Link>

      {/* Navigation */}
      <ul className="flex items-center gap-8">
        <li className="flex items-center gap-4">
          <Link
            to="/finder"
            className={`py-2 px-6 rounded-md ${
              pathname === "/finder"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : ""
            }`}
          >
            Find Work
          </Link>

          <Link
            to="/myjobs"
            className={`py-2 px-6 rounded-md ${
              pathname === "/myjobs"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : ""
            }`}
          >
            My Jobs
          </Link>

          <Link
            to="/post"
            className={`py-2 px-6 rounded-md ${
              pathname === "/post"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : ""
            }`}
          >
            Post a Job
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                loginWithRedirect()
              }
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />

              Login
            </button>

            <button
              onClick={() =>
                loginWithRedirect()
              }
              className="py-2 px-6 rounded-md border flex items-center gap-4 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />

              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;