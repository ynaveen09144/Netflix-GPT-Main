import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS
        );
        if (!data.ok) {
          throw new Error("Failed to fetch movies");
        }
        const json = await data.json();
        dispatch(addPopularMovies(json.results || []));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    getPopularMovies();
  }, [dispatch]);
};

export default usePopularMovies;
