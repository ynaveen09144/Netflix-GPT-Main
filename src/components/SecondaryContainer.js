import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 lg:-mt-72 px-4 md:px-8 lg:pl-12 relative z-30">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
          <MovieList title={"Popular"} movies={movies?.popularMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies?.upcomingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
