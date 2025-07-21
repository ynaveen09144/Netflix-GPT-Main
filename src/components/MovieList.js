import React, { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleWheelScroll = (e) => {
      e.preventDefault();
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheelScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, []);

  return (
    <div className="px-6">
      <h1 className="text-3xl py-4 text-white">{title}</h1>
      <div
        className="flex overflow-x-scroll no-scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        ref={scrollRef}
      >
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
