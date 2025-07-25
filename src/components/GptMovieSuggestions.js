import React, { useRef } from "react";
import { useSelector } from "react-redux";

const GptMovieSuggestions = () => {
  const { moviesResults, movieNames } = useSelector((store) => store.gpt);
  const scrollRef = useRef(null);

  if (!movieNames || !movieNames.length) return null;

  // Filter movies with valid posters and create combined array
  const moviesWithPosters = movieNames
    .map((name, index) => ({
      name,
      poster: moviesResults[index]?.poster_path,
      id: moviesResults[index]?.id || index,
    }))
    .filter((movie) => movie.poster);

  if (moviesWithPosters.length === 0) {
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg text-center">
        <p>No movies with available posters found.</p>
      </div>
    );
  }

  // Handle mouse wheel scrolling
  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY * 0.5;
    }
  };

  return (
    <div className="p-2 md:p-4 m-2 md:m-4 bg-black text-white bg-opacity-90 rounded-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
        Recommended Movies
      </h2>

      {/* Scrollable movie container */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex overflow-x-auto gap-3 md:gap-6 pb-3 md:pb-4 scrollbar-hide"
      >
        {moviesWithPosters.map((movie) => (
          <div
            key={`${movie.id}-${movie.name}`}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 hover:scale-105 transition-transform duration-200"
          >
            <div className="font-bold text-center mb-1 md:mb-2 h-10 md:h-12 flex items-center justify-center px-1 md:px-2 text-xs sm:text-sm md:text-base">
              {movie.name}
            </div>
            <img
              className="w-full h-40 sm:h-52 md:h-64 object-cover rounded-md hover:ring-1 md:hover:ring-2 hover:ring-white"
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt={movie.name}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>

      {/* Scroll hint for users */}
      <p className="text-center text-gray-400 mt-1 md:mt-2 text-xs md:text-sm">
        Scroll horizontally to view more movies
      </p>
    </div>
  );
};

export default GptMovieSuggestions;
