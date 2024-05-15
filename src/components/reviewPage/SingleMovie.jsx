import React, { useEffect, useState } from "react";
import { getSingleMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import { Link, useParams } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import RatingStar from "./RatingStar";
import AddRatingModal from "./AddRatingModal";
import { addReview } from "../../api/review";

export default function SingleMovie() {
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);

  //for rating part
  const [ratingContainer, setRatingContainer] = useState(false);

  const { updateNotification } = useNotification();

  const { movieId } = useParams();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) updateNotification("error", error);

    setReady(true);
    setMovie(movie);
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <VscLoading className="animate-spin text-primary-red text-8xl" />
        <div className="text-3xl text-white text-center animate-pulse">
          Hold on, almost there...🍿🎥
        </div>
      </div>
    );

  const {
    id,
    trailer,
    poster,
    title,
    storyline,
    director,
    cast,
    genres,
    type,
    language,
    releaseDate,
    tags,
    reviews = {},
  } = movie;
  const convertDate = (date = "") => {
    return date.split("T")[0];
  };

  const handleAddReview = () => {
    setRatingContainer((prevRatingContainer) => !prevRatingContainer);
  };

  const handleSubmit = async (data) => {
    console.log("handleSubmit....",data)
    const { error, message } = await addReview(movieId, data);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    handleAddReview();
  };

  return (
    <>
      <div
        className={
          ratingContainer
            ? "hidden"
            : "flex flex-col justify-center md:w-[70%] p-2 md:p-5 border-dark-subtle mx-auto my-5"
        }
      >
        <video controls poster={poster} src={trailer}></video>
        <div className="flex mt-4 border-t pt-4 justify-between">
          <div className="w-[70%] md:w-[80%]">
            <h1 className="text-xl md:text-4xl text-golden ">{title}</h1>
            <div className="mb-3 md:my-3 flex flex-wrap space-x-3">
              {genres.map((g, index) => {
                return (
                  <span
                    key={index}
                    className="text-primary-red border p-1 text-xs md:text-md text-center rounded-xl"
                  >
                    <span>{g}</span>
                  </span>
                );
              })}
            </div>
            <p className="text-dark-subtle text-xs md:text-md">{storyline}</p>
          </div>
          <div className="flex flex-col items-end">
            <RatingStar
              rating={reviews.ratingAverage}
              className="text-xs md:text-lg"
            />
            <Link
              to={"/movie/reviews/" + id}
              className="text-golden text-xs border p-1 md:p-2 border-primary-red md:text-sm hover:text-blue"
            >
              Read {reviews.reviewsCount} reviews
            </Link>
            <button
              onClick={handleAddReview}
              className="text-white mt-2 text-[50%] md:text-base border border-primary-red p-2 hover:bg-primary-red hover:text-white duration-300"
            >
              Add Review
            </button>
          </div>
        </div>
        <div className="mt-6 space-y-3 border-b pb-4 text-dark-subtle text-xs md:text-base">
          <div>
            <span>Director: </span>
            <span className="text-primary-red">{director}</span>
          </div>
          <div>
            <span>Cast: </span>
            <span>
              {cast.map((c, index) => {
                return (
                  <span key={index} className="text-primary-red">
                    {c.name} ({c?.roleAs}),
                  </span>
                );
              })}
            </span>
          </div>
          <div>
            <span>Release Date: </span>
            <span className="text-primary-red">{convertDate(releaseDate)}</span>
          </div>
          <div>
            <span>Genres: </span>
            <span>
              {genres.map((g, index) => {
                return (
                  <span key={index} className="text-primary-red">
                    <span>{g}, </span>
                  </span>
                );
              })}
            </span>
          </div>
          <div>
            <span>Language: </span>
            <span className="text-primary-red">{language}</span>
          </div>
          <div>
            <span>Type: </span>
            <span className="text-primary-red">{type}</span>
          </div>
          <div>
            <span>Tags: </span>
            <span>
              {tags.map((t, index) => {
                return (
                  <span key={index} className="text-primary-red">
                    <span>#{t} </span>
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          ratingContainer
            ? "border mt-20 md:w-[50%] p-2 md:p-5 mx-auto flex flex-col justify-center items-center space-y-5"
            : "hidden"
        }
      >
        <AddRatingModal onSubmit={handleSubmit} />
      </div>
    </>
  );
}
