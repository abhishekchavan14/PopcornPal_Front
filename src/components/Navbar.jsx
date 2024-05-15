import React, { useState } from "react";

import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import SearchField from "./SearchField";
import { CgProfile } from "react-icons/cg";
// import { getReviewsByOwner } from "../api/review";

export default function Navbar() {
  const location = useLocation(); //used in keeping the Home,About etc in Navbar active when we on that corresponding path

  //to toggle between the menu and close icon (for mobile devices)
  const [nav, setNav] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  function handleMenuClick() {
    setNav(!nav);
  }
  const handleProfileClick = () => {
    setDisplayProfile((prev) => !prev);
  };
  return (
    <div className="bg-primary p-4 md:pl-10 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        {isLoggedIn ? (
          <Link
            to="/review-movies"
            className=" text-3xl font-bold text-primary-red"
          >
            PopcornPal
          </Link>
        ) : (
          <h1 className=" text-3xl font-bold text-primary-red">PopcornPal</h1>
        )}

        <ul className="mr-10 text-lg items-center hidden md:flex">
          <li className="mr-8">
            {isLoggedIn ? (
              ""
            ) : (
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "text-primary-red"
                    : "text-white hover:text-primary-red duration-300"
                }
              >
                Home
              </Link>
            )}
          </li>
          <li className="mr-8">
            {isLoggedIn ? (
              ""
            ) : (
              <Link
                to="/auth/sign-up"
                className={
                  location.pathname === "/auth/sign-up"
                    ? "text-primary-red"
                    : "text-white hover:text-primary-red duration-300"
                }
              >
                Sign up
              </Link>
            )}
          </li>
          <li className=" z-10">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <SearchField />
                <button
                  onClick={handleLogout}
                  className={
                    location.pathname === "/"
                      ? "text-primary-red"
                      : "text-white hover:text-primary-red duration-300 cursor-pointer"
                  }
                >
                  Log Out
                </button>
                <CgProfile
                  className="text-3xl text-white hover:text-primary-red duration-300 cursor-pointer"
                  onClick={handleProfileClick}
                />
                <Profile visible={displayProfile} />
              </div>
            ) : (
              <Link
                to="/auth/log-in"
                className={
                  location.pathname === "/auth/log-in"
                    ? "text-primary-red"
                    : "text-white hover:text-primary-red duration-300"
                }
              >
                Log in
              </Link>
            )}
          </li>
        </ul>
        {/*till this was the navbar for large devices*/}
        {/*------------------------------------------------------------------------------------------------------------------------------------*/}
        {/*below is the menu bar that is only for smaller devices*/}
        {isLoggedIn ? (
          <SearchField classname=" w-[30%] md:hidden z-10" />
        ) : null}
        <button
          className=" text-white justify-end mr-2 right-5 bg-secondary p-1 rounded-md block md:hidden"
          onClick={handleMenuClick}
        >
          {!nav ? (
            <IoMdMenu className="size-5" />
          ) : (
            <IoMdClose className="size-5" />
          )}
        </button>
        <div
          className={
            !nav
              ? "fixed right-[-100%]"
              : "fixed right-0 top-16 w-[40%] bg-primary-red text-white ease-in-out duration-300 z-30"
          }
        >
          <ul>
            <li className="p-4 border-b border-gray-600 delay-75 duration-300 ease-in mt-2">
              <Link to="/" onClick={handleMenuClick}>
                Home
              </Link>
            </li>
            <li className="p-4 border-b border-gray-600 delay-75 duration-300 ease-in mt-2">
              <Link to="/auth/sign-up" onClick={handleMenuClick}>
                Sign Up
              </Link>
            </li>
            <li className="p-4 border-b border-gray-600 delay-100 duration-300 ease-in">
              {isLoggedIn ? (
                <button onClick={handleLogout}>Log Out</button>
              ) : (
                <Link to="/auth/log-in" onClick={handleMenuClick}>
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const Profile = async ({ visible }) => {
  const { authInfo, handleLogout } = useAuth();
  const { profile } = authInfo;
  // await getReviewsByOwner(profile.id);
  {
    return visible ? (
      <>
        <div className="w-[20%] h-screen bg-dark-grey flex flex-col space-y-5 py-16 items-center absolute top-20 shadow-xl shadow-black right-0 text-white duration-500">
          <CgProfile className="text-8xl text-dark-subtle" />
          <div className="flex flex-col items-center">
            <p className="text-3xl">{profile.username}</p>
            <p className="text-sm italic">{profile.email}</p>
          </div>
          <div>Reviewed 100 movies</div>
          <div className="border py-2 px-4">
            <button
              onClick={handleLogout}
              className={
                location.pathname === "/"
                  ? "text-primary-red"
                  : "text-white hover:text-primary-red duration-300 cursor-pointer"
              }
            >
              Log Out
            </button>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="w-[20%] h-screen bg-dark-grey flex flex-col justify-center items-center absolute top-20 right-[-100%] text-white duration-500"></div>
      </>
    );
  }
};
