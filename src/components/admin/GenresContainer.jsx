import React, { useState } from "react";
import genres from "../../utils/genres";
import SubmitBtn from "../form/SubmitBtn";

export default function GenresContainer({ onSubmit }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenresSelector = (gen) => {
    let newGenres = [];

    if (selectedGenres.includes(gen)) {
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    } else {
      newGenres = [...selectedGenres, gen];
    }
    setSelectedGenres([...newGenres]);
  };
  const handleSubmit = () => {
    onSubmit(selectedGenres);
  };
  return (
    <div>
      <h1 className="text-md text-white mt-8">Select Genres:</h1>
      {genres.map((g) => {
        return (
          <Genre
            key={g}
            selected={selectedGenres.includes(g)}
            handleClick={() => handleGenresSelector(g)}
          >
            {g}
          </Genre>
        );
      })}
      <span className="mx-2 px-4 py-1 rounded-lg bg-green hover:text-white duration-300">
        <button type="button" onClick={handleSubmit}>
          Submit Genres
        </button>
      </span>
    </div>
  );
}

const Genre = ({ children, selected, handleClick }) => {
  const getSelectedStyle = () => {
    return selected ? "text-white bg-primary-red " : "text-dark-subtle ";
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={getSelectedStyle() + "text-nowrap border px-1 m-1 rounded-lg"}
    >
      {children}
    </button>
  );
};
