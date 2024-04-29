import React from "react";
import GridContainer from "./GridContainer";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import RatingStar from "./RatingStar";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

export default function MovieList({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <div className="p-4">
      <h1 className="text-lg md:text-2xl font-semibold mb-2 text-white">{title}</h1>
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const { id, title, poster, reviews } = movie;
  return (
    <Link to={"/movie/" + id} className=" hover:scale-110 duration-200 custom-shadow ">
      <img className="aspect-video object-cover" src={poster} alt={title} />
      <h1 className="text-dark-subtle text-sm md:text-lg px-2 font-semibold" title={title}>
        {trimTitle(title)}
      </h1>
      <RatingStar rating={movie.reviews.ratingAverage}/>
    </Link>
  );
};
