import React, { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { Link, useParams } from "react-router-dom";
import { addDownvote, addUpvote, getReviewsByMovie } from "../../api/review";
import { useNotification } from "../../hooks";
import { getSingleMovie } from "../../api/movie";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { PiPopcornFill } from "react-icons/pi";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});

  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { reviews, error } = await getReviewsByMovie(movieId);
    if (error) updateNotification("error", error);
    reviews.sort((a, b) => b.upvotes - a.upvotes);
    setReviews([...reviews]);
  };
  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) updateNotification("error", error);

    setMovie(movie);
  };

  useEffect(() => {
    if (movieId) {
      fetchReviews();
      fetchMovie();
    }
  }, [movieId]);
  // console.log(reviews);

  return (
    <div className="w-full h-full flex justify-center items-center text-white">
      <div className="md:w-[80%] mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-2xl px-2 md:px-4">
            <span>Reviews for: </span>
            <span className="text-primary-red">{movie.title}</span>
          </h1>
          <RatingStar
            rating={movie.reviews?.ratingAverage}
            className="text-[120%]"
          />
        </div>
        <div className="space-y-3">
          {reviews.map((r) => {
            return <ReviewCard review={r} key={r.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
const ReviewCard = ({ review }) => {
  const { owner, content, rating, upvotes, downvotes, id, reviewTag } = review;
  const ownerID = owner.id;
  const reviewID = id;
  // console.log("ReviewID"+reviewID)
  const { movieId } = useParams();
  const [reviewUpvotes, setReviewUpvotes] = useState(upvotes);
  const [reviewDownvotes, setReviewDownvotes] = useState(downvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [reviewColor, setReviewColor] = useState("text-dark-subtle")
  const { updateNotification } = useNotification();
  const handleUpvote = async () => {
    if (!hasUpvoted && !hasDownvoted) {
      const { error, message } = await addUpvote(movieId, reviewID, ownerID);
      if (error) return updateNotification("error", error);
      setReviewUpvotes((prevUpvotes) => prevUpvotes + 1);
      setHasUpvoted(true);
      updateNotification("success", message);
    }
  };

  const handleDownvote = async () => {
    if (!hasUpvoted && !hasDownvoted) {
      const { error, message } = await addDownvote(movieId, reviewID, ownerID);
      if (error) return updateNotification("error", error);
      setReviewDownvotes((prevDownvotes) => prevDownvotes + 1);
      setHasDownvoted(true);
      updateNotification("success", message);
    }
  };

  const checkReviewTag = (reviewTag) =>{
    switch (reviewTag) {
      case "Positive":
        setReviewColor("text-light-green")
        break;
      case "Negative":
        setReviewColor("text-red-300")
        break;
      case "Mixed":
        setReviewColor("text-orange-300")
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    // Check review tag only once, after component mount
    checkReviewTag(reviewTag);
  }, []);

  return (
    <div className="border-b-4 border-dark-subtle my-5 p-4 flex justify-between">
      <div className="w-[80%]">
        <div className="flex">
          <div className="border border-primary-red rounded-full w-10 h-10 flex justify-center items-center text-xl ">
            {owner.username ? owner.username[0].toUpperCase() : ""}
          </div>
          <div className="flex items-center">
            <h1 className="mx-2">{owner.username}</h1>
            <h1 className="mx-2 text-golden">{rating}</h1>
            <PiPopcornFill className="text-golden" />
          </div>
        </div>
        <p className={` ${reviewColor} text-sm mt-2`}>{content}</p>
      </div>
      <div className="w-[15%] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-xl space-y-2">
          <BiUpvote
            className={`hover:text-green duration-200 cursor-pointer ${
              hasUpvoted ? "text-green" : ""
            }`}
            onClick={handleUpvote}
            disabled={hasUpvoted || hasDownvoted}
          />
          <BiDownvote
            className={`hover:text-red-400 duration-200 cursor-pointer ${
              hasDownvoted ? "text-red-400" : ""
            }`}
            onClick={handleDownvote}
            disabled={hasUpvoted || hasDownvoted}
          />
        </div>
        <div>
          <p>{reviewUpvotes}</p>
          <p>{reviewDownvotes}</p>
        </div>
      </div>
    </div>
  );
};
