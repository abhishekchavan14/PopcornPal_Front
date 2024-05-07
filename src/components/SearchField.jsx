import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api/movie";
import { useNotification } from "../hooks";
import { Link } from "react-router-dom";

export default function SearchField({classname}) {
  const [movies, setMovies] = useState([]);
  const [visible, setVisible] = useState(false);
  const [results, setResults] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getAllMovies();
    if (error) return updateNotification("error", error);
    setMovies(movies);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleOnFocus = () => {
    setVisible(true);
  };
  const handleOnBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setVisible(false);
      setResults([]);
    }
  };
  const handleChange = (e) => {
    const result = movies.filter((m) =>
      m.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setResults(result);
  };

  return (
    <>
      <div className={"flex flex-col relative " + classname} onBlur={handleOnBlur}>
        <input
          type="text"
          placeholder="Search"
          className=" bg-transparent outline-none border rounded-lg text-white py-1 indent-2"
          onFocus={handleOnFocus}
          onChange={handleChange}
        />
        <SearchResults visible={visible} results={results} />
      </div>
    </>
  );
}

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "...";
};

const SearchResults = ({ visible, results }) => {
  if (!visible) return null;
  return (
    <>
      {results.length ? (
        <div className="absolute overflow-y-scroll overflow-x-hidden scroll-smooth hide-scrollbar top-10 text-black bg-white bg-opacity-100 p-3 h-48 border-b-4">
          {results.map((m) => {
            {
              return (
                <>
                  <Link
                    to={"/movie/" + m._id}
                    className="flex items-center border-b-2 border-primary-red py-2 space-x-2"
                  >
                    <img src={m.poster.url} alt="img" className="w-[40%]" />
                    <p className=" text-[50%] md:text-sm">{trimTitle(m.title)}</p>
                  </Link>
                </>
              );
            }
          })}
        </div>
      ) : (
        <div className="absolute top-10 text-white bg-primary-red bg-opacity-70 p-3 ">
          No movies found!
        </div>
      )}
    </>
  );
};
