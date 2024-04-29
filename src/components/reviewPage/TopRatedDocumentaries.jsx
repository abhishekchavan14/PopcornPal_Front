import React, { useState, useEffect } from "react";

import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";

import MovieList from "./MovieList";

export default function TopRatedDocumentaries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();
  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies("Documentary");
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return <MovieList movies={movies} title="Top Rated Documentaries:" />;
}
