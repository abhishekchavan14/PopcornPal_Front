import React from "react";
import TopRatedMovies from "./TopRatedMovies";
import Container from "../Container";
import TopRatedWebSeries from "./TopRatedWebSeries";
import TopRatedDocumentaries from "./TopRatedDocumentaries";
import HeroSlideShow from "./HeroSlideShow";

export default function ReviewPage() {
  return (
    <div className="w-full h-full py-4 md:px-10 flex flex-col justify-center items-center">
      <div className="w-[100%] md:w-[80%]">
        <HeroSlideShow />
      </div>
      <div className="space-y-3 py-5">
        <TopRatedMovies />
        <TopRatedWebSeries />
        <TopRatedDocumentaries />
      </div>
    </div>
  );
}
