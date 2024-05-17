import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { getMovieNamesFromIds } from "../api/movie";
import { getReviewsByOwner } from "../api/review";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import Container from "./Container";

export default function Account() {
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
  console.log(authInfo);
  {
    return (
      <>
        <Container className="flex justify-center items-center w-full h-full md:hidden">
          <div
            className={`w-[80%] mt-10 h-[70%] m-auto bg-dark-grey flex flex-col space-y-3 py-4 items-center absolute top-20 shadow-xl shadow-black text-white duration-300`}
          >
            <CgProfile className="text-8xl text-dark-subtle" />
            <div className="flex flex-col items-center">
              <p className="text-3xl">{authInfo.profile.username}</p>
              <p className="text-sm italic">{authInfo.profile.email}</p>
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

            <div className="border py-2 px-8">
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
        </Container>
      </>
    );
  }
}
