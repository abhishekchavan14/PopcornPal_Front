import React, { useEffect, useState } from "react";

import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import SearchField from "./SearchField";
import { CgProfile } from "react-icons/cg";
import { getReviewsByOwner } from "../api/review";
import { getMovieNamesFromIds } from "../api/movie";

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
                <CgProfile
                  className="text-3xl text-white hover:text-primary-red duration-300 cursor-pointer"
                  onClick={handleProfileClick}
                />
                <Profile
                  visible={displayProfile}
                  username={authInfo.profile.username}
                  email={authInfo.profile.email}
                />
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
              {isLoggedIn ? (
                <Link to="/account" onClick={handleProfileClick}>
                  Account
                </Link>
              ) : (
                <Link to="/auth/sign-up" onClick={handleMenuClick}>
                  Sign Up
                </Link>
              )}
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

const Profile = ({ visible, username, email }) => {
  const { authInfo, handleLogout } = useAuth();
  const [reviewArray, setReviewArray] = useState([]);
  const [likedMovieNames, setLikedMovieNames] = useState([]);

  const getArrayOfLikedMovieNames = async () => {
    const { error, movieNameArray } = await getMovieNamesFromIds(
      authInfo.profile.likedMovies
    );
    if (error) return console.log(error);
    setLikedMovieNames(movieNameArray);
  };
  useEffect(() => {
    async function getReviews() {
      const { error, reviews } = await getReviewsByOwner(authInfo.profile.id);
      if (error) console.log(error);
      setReviewArray(reviews);
    }
    getReviews();
    getArrayOfLikedMovieNames();
  }, []);

  {
    return (
      <>
        <div
          className={`w-[20%] h-screen bg-dark-grey flex flex-col space-y-3 p-6 items-center absolute top-20 shadow-xl shadow-black text-white duration-300 ${
            visible ? "right-0 " : "right-[-100%] "
          } `}
        >
          <CgProfile className="text-8xl text-dark-subtle" />
          <div className="flex flex-col items-center">
            <p className="text-3xl">{username}</p>
            <p className="text-sm italic">{email}</p>
          </div>
          <div className="max-h-[40%] w-full p-2">
            <p className="">💬Your reviews:</p>
            <div className="max-h-[60%] overflow-y-scroll border-l px-1 hide-scrollbar mb-2">
              {reviewArray
                .sort((a, b) => b.upvotes - a.upvotes)
                .map((r) => {
                  return (
                    <div key={r.id}>
                      <Link
                        to={"/movie/reviews/" + r.parentMovie}
                        className="text-golden text-xs border-b"
                      >
                        {r.content} | {r.upvotes}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="max-h-[40%] w-full p-2">
            <p className="">❤️Liked by you:</p>
            <div className="max-h-[60%] overflow-y-scroll border-l px-1 hide-scrollbar mb-2">
              {likedMovieNames.map((m) => {
                return (
                  <div key={m.id}>
                    <Link
                      to={"/movie/" + m.id}
                      className="text-golden text-xs border-b my-3"
                    >
                      {m.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border py-2 px-8 absolute bottom-36">
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
    );
  }
};
