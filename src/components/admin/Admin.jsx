import React, { useState } from "react";
import TrailerUpload from "./TrailerUpload";
import Input from "../form/Input";
import TagsInput from "./TagsInput";
import SubmitBtn from "../form/SubmitBtn";
import CastForm from "../form/CastForm";
import GenresContainer from "./GenresContainer";
import PosterUpload from "./PosterUpload";
import { useNotification } from "../../hooks";
import { uploadMovie } from "../../api/movie";

const defaultMovieInfo = {
  title: "", //
  storyline: "", //
  director: "", //
  releaseDate: "", //
  type: "", //
  tags: [], //
  cast: [], //
  genres: [], //
  poster: null,
  language: "", //
  trailer: {
    url: "",
    public_id: "",
  },
};

export default function Admin() {
  const { updateNotification } = useNotification();
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      storyline,
      director,
      releaseDate,
      type,
      tags,
      cast,
      genres,
      poster,
      language,
      trailer,
    } = movieInfo;

    const formData = new FormData();
    const finalMovieInfo = {
      ...movieInfo,
    };
    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);
    finalMovieInfo.cast = JSON.stringify(cast);
    finalMovieInfo.poster = poster;
    finalMovieInfo.trailer = JSON.stringify(trailer);
    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }

    //validation

    if (!title.trim()) return updateNotification("error", "Title is Missing!");
    if (!storyline.trim())
      return updateNotification("error", "storyline is Missing!");
    if (!director.trim())
      return updateNotification("error", "director is Missing!");
    if (!releaseDate)
      return updateNotification("error", "releaseDate is Missing!");
    if (!type.trim()) return updateNotification("error", "type is Missing!");
    if (!tags.length) return updateNotification("error", "tags is Missing!");
    if (!cast.length) return updateNotification("error", "cast is Missing!");
    if (!genres.length)
      return updateNotification("error", "genres is Missing!");
    if (!poster) return updateNotification("error", "poster is Missing!");
    if (!language.trim())
      return updateNotification("error", "language is Missing!");
    if (!trailer) return updateNotification("error", "trailer is Missing!");
    //Sending the movie to backend
    const res = await uploadMovie(formData);
    console.log(res);
  };
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };
  const updateCast = (newCast) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, newCast] });
  };
  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };
  const updatePoster = (poster) => {
    setMovieInfo({ ...movieInfo, poster });
  };
  const updateTrailer = (data) => {
    setMovieInfo({
      ...movieInfo,
      trailer: { url: data.secure_url, public_id: data.public_id },
    });
  };
  const { title, storyline, type, director, releaseDate, language, tags } =
    movieInfo;
  return (
    <div className="bg-[#1e1e1e] inset-0 fixed z-[-10] flex justify-center items-center text-white p-5 overflow-y-scroll">
      <div className="border-2 rounded-xl p-5 w-[90%] md:w-[70%] absolute top-20 flex flex-col">
        <div className=" borderborder-red-600 flex flex-col md:flex-row justify-around">
          <TrailerUpload onSubmit={updateTrailer} />
          <div className="lg:w-[20%] border border-dashed h-56 flex flex-col items-center justify-center p-2">
            <PosterUpload onUpload={updatePoster} />
          </div>
        </div>
        <div className="p-4">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col md:flex-row md:space-x-3 text-black"
          >
            <div className="w-[70%] flex flex-col">
              <Input
                value={title}
                name="title"
                id="title"
                label="Title"
                placeholder="Avengers: Infinity War"
                onChange={handleChange}
              />
              <Input
                value={type}
                name="type"
                id="type"
                label="Type"
                placeholder="Movie, Web Series, Documentary"
                onChange={handleChange}
              />
              <Input
                value={director}
                name="director"
                id="director"
                label="Director"
                placeholder="Anurag Kashyap"
                onChange={handleChange}
              />
              <Input
                type="date"
                value={releaseDate}
                name="releaseDate"
                id="releaseDate"
                label="Release Date"
                onChange={handleChange}
              />
              <Input
                type="language"
                value={language}
                name="language"
                id="language"
                label="Language"
                placeholder="English"
                onChange={handleChange}
              />

              <label htmlFor="storyline" className="text-md text-white">
                Tags
              </label>
              <TagsInput name="tags" value={tags} onChange={updateTags} />
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="storyline" className="text-md text-white">
                Storyline
              </label>
              <textarea
                id="storyline"
                name="storyline"
                value={storyline}
                onChange={handleChange}
                placeholder="Movie Storyline..."
                className="resize-none h-24 text-white border border-dark-subtle rounded-md p-1 indent-1 bg-transparent hover:border-primary-red transition duration-300"
              ></textarea>
              <h1 className="text-md text-white mt-8">Cast</h1>
              <div className="border border-dark-subtle rounded-md p-1 indent-1 bg-transparent">
                <CastForm onSubmit={updateCast} />
              </div>
              <div>
                <GenresContainer onSubmit={updateGenres} />
              </div>
              <div className="m-8 text-center">
                <SubmitBtn value="Post the Movie" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// name, label, placeholder, ...rest
