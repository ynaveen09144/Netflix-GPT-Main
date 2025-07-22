import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-36 sm:w-40 md:w-44 lg:w-48 pr-2 sm:pr-3 md:pr-4">
      <img
        className="w-full h-auto transition-transform duration-300 hover:scale-105"
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
