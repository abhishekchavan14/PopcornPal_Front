import React, { useEffect, useRef, useState } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../../hooks";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import Chat from "../Chat";
import logo from "../images/Screenpal.png";

let count = 0;
let intervalId;

export default function HeroSlideShow() {
  const { updateNotification } = useNotification();
  const [slide, setSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return updateNotification("error", error);
    setSlides([...movies]);
    setSlide(movies[0]);
  };

  const startSlideShow = () => {
    intervalId = setInterval(() => {
      handleOnNextClick();
    }, 3500);
  };
  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };
  const handleOnNextClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setSlide(slides[count]);
    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
  };
  const handleOnPrevClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setSlide(slides[count]);
    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      "slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
    startSlideShow();
  };

  useEffect(() => {
    fetchLatestUploads();
    return () => {
      pauseSlideShow();
    };
  }, []);

  useEffect(() => {
    if (slides.length) startSlideShow();
  }, [slides.length]);

  return (
    <div className="w-full flex justify-center space-x-10">
      {/* SlideShow */}
      <div className="w-4/5 aspect-video relative overflow-hidden">
        <Link to={"/movie/" + slide.id} className="w-full">
          <img
            // onAnimationEnd={handleAnimationEnd}
            ref={slideRef}
            className="w-full"
            src={slide.poster}
            alt="poster"
          />
          <div className="absolute inset-0 flex flex-col justify-end py-3 px-2 bg-gradient-to-tr from-black ">
            <span className="text-xs md:text-lg lg:text-3xl text-golden">
              {slide.title}
            </span>
            {/* <h1 className=" text-xl text-white">{slide.description}</h1> */}
            <p className=" text-[0.25%] md:text-xs lg:text-xl text-white">
              {slide.description}
            </p>
          </div>
        </Link>
        {/* cloned */}
        <img
          onAnimationEnd={handleAnimationEnd}
          ref={clonedSlideRef}
          className=" w-full absolute inset-0 -z-10"
          src={clonedSlide.poster}
          alt=""
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between">
          <button
            onClick={handleOnPrevClick}
            type="button"
            className="text-white hover:text-golden duration-200 p-2 ml-2 rounded bg-black bg-opacity-50 text-lg md:text-3xl"
          >
            <FiArrowLeftCircle />
          </button>
          <button
            onClick={handleOnNextClick}
            type="button"
            className="text-white hover:text-golden duration-200 p-2 mr-2 rounded bg-black bg-opacity-50 text-lg md:text-3xl"
          >
            <FiArrowRightCircle />
          </button>
        </div>
      </div>

      {/* Upnext */}
      <div className="hidden md:block md:w-2/5 relative">
        {/* <h1 className="text-3xl text-red-300 text-center mt-0 fixed -z-1"></h1> */}
        <img src={logo} className="absolute -z-10 opacity-50" />
        <Chat />
      </div>
    </div>
  );
}
