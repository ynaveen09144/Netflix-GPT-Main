import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { getChatCompletion } from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie.trim()
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error(
          `TMDB API request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error("Error searching movie in TMDB:", error);
      return null;
    }
  };

  const handleGptSearchClick = async (e) => {
    e.preventDefault();

    try {
      const gptSearchQuery =
        "Act as a Movie recommendation system to suggest movies for query: " +
        searchText.current.value +
        ". Give me a list of relevant movie names, properly comma separated with a space after each comma.";

      const gptResponse = await getChatCompletion([
        {
          role: "system",
          content:
            "You are a movie recommendation assistant. Provide a comprehensive list of relevant movies.",
        },
        { role: "user", content: gptSearchQuery },
      ]);

      let gptMovies = gptResponse.split(", ").map((movie) => movie.trim());
      if (gptMovies.length === 1) {
        gptMovies = gptResponse.split(",").map((movie) => movie.trim());
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          moviesResults: tmdbResults.filter(Boolean),
        })
      );
    } catch (error) {
      console.error("Error in GPT search:", error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 gap-4 p-4"
        onSubmit={handleGptSearchClick}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-2 border border-gray-300 rounded"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
