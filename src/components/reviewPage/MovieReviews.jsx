import React, { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { Link, useParams } from "react-router-dom";
import {
  addDownvote,
  addUpvote,
  getReviewsByMovie,
  removeReview,
  updateReview,
} from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import { getSingleMovie } from "../../api/movie";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { PiPopcornFill } from "react-icons/pi";
import { VscLoading } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Filter from "bad-words";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);

  const { movieId } = useParams();
  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { reviews, error } = await getReviewsByMovie(movieId);
    if (error) updateNotification("error", error);
    reviews.sort((a, b) => b.upvotes - a.upvotes);
    setReviews([...reviews]);
    setReady(true);
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
  if (!ready)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <VscLoading className="animate-spin text-primary-red text-8xl" />
        <div className="text-3xl text-white text-center animate-pulse">
          Getting the Reviews Ready..💬
        </div>
      </div>
    );

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
  const { authInfo } = useAuth();
  const loggedInUserID = authInfo.profile.id;
  const { owner, content, rating, upvotes, downvotes, id, reviewTag } = review;
  const ownerID = owner.id;
  const reviewID = id;
  // console.log("ReviewID"+reviewID)
  const { movieId } = useParams();
  const [reviewUpvotes, setReviewUpvotes] = useState(upvotes);
  const [reviewDownvotes, setReviewDownvotes] = useState(downvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [reviewColor, setReviewColor] = useState("text-dark-subtle");
  const [editContainerVisible, setEditContainerVisible] = useState(false);
  const [deleteContainerVisible, setDeleteContainerVisible] = useState(false);
  const { updateNotification } = useNotification();
  const handleUpvote = async () => {
    if (!hasUpvoted && !hasDownvoted) {
      const { error, message } = await addUpvote(movieId, reviewID, ownerID);
      if (error) return updateNotification("error", error);

      //TODO: fault in backend...doesnt upvote but shows the 500 error in green

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

  const checkReviewTag = (reviewTag) => {
    switch (reviewTag) {
      case "Positive":
        setReviewColor("text-light-green");
        break;
      case "Negative":
        setReviewColor("text-red-300");
        break;
      case "Mixed":
        setReviewColor("text-orange-300");
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setEditContainerVisible(true);
  };
  const handleDeleteClick = () => {
    setDeleteContainerVisible(true);
  };
  const handleEditSubmit = async (text) => {
    const filter = new Filter();
    const content = filter.clean(text)
    console.log("FILTERED...", content)
    const { error, message } = await updateReview(reviewID, content);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setEditContainerVisible(false);
    // window.location.reload();
  };

  const handleDeleteSubmit = async (deleteReview) => {
    if (deleteReview === true) {
      const { error, message } = await removeReview(reviewID);
      if (error) return updateNotification("error", error);
      updateNotification("success", message);
      setDeleteContainerVisible(false);
      window.location.reload();
    } else {
      setDeleteContainerVisible(false);
    }
  };

  useEffect(() => {
    // Check review tag only once, after component mount
    checkReviewTag(reviewTag);
  }, []);

  return (
    <>
      {editContainerVisible ? (
        <>
          <div>
            <EditContainer content={content} onSubmit={handleEditSubmit} />
          </div>
        </>
      ) : deleteContainerVisible ? (
        <>
          <div>
            <DeleteContainer onSubmit={handleDeleteSubmit} />
          </div>
        </>
      ) : (
        <div className="border-b-4 border-dark-subtle my-5 p-4 flex justify-between">
          <div className="w-[80%]">
            <div className="flex items-center">
              <div className="border border-primary-red rounded-full min-w-10 min-h-10 flex justify-center items-center text-xl ">
                {owner.username ? owner.username[0].toUpperCase() : ""}
              </div>
              <div className="flex items-center">
                <h1 className="mx-2">{owner.username}</h1>
                <h1 className="text-golden">{rating}</h1>
                <PiPopcornFill className="text-golden" />
              </div>
            </div>
            <p className={` ${reviewColor} text-sm mt-2`}>{content}</p>
            {ownerID === loggedInUserID ? (
              <div className="text-lg py-2 flex space-x-3">
                <CiEdit onClick={handleEditClick} />
                <MdDelete onClick={handleDeleteClick} />
              </div>
            ) : null}
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
      )}
    </>
  );
};

const EditContainer = ({ content, onSubmit }) => {
  const [text, setText] = useState(content);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center lg:w-[80%] m-auto">
        <p className="text-xl">Edit Review</p>
        <textarea
          value={text}
          className="text-white p-3 w-full h-36 outline-none bg-white bg-opacity-50 m-1 resize-none"
          onChange={handleChange}
        ></textarea>
        <button
          className="border border-green p-2 m-2 hover:bg-green hover:text-black duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};
const DeleteContainer = ({ onSubmit }) => {
  const [deleteReview, setDeleteReview] = useState(false);
  const handleCancel = () => {
    onSubmit(deleteReview);
  };
  const handleDelete = () => {
    setDeleteReview((prev) => {
      onSubmit(!prev);
      return !prev;
    });
  };
  return (
    <>
      <div className="w-full lg:w-[80%] m-auto flex flex-col justify-center items-center">
        <p className="text-xl text-red-600 text-center">
          Do you really want to delete this review?
        </p>
        <div className="flex space-x-10 m-4">
          <button
            className="border hover:bg-white hover:text-black duration-200 p-2 "
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="border border-red-600 hover:bg-red-600 duration-200 p-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
