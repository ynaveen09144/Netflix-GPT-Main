import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS
        );
        if (!data.ok) {
          throw new Error("Failed to fetch movies");
        }
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results || []));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [dispatch]);
};

export default useNowPlayingMovies;
