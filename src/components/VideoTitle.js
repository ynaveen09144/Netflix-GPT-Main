import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl md:text-6xl font-bold mb-3">{title}</h1>
      <p className="text-base md:text-lg w-full md:w-3/4 mb-6">{overview}</p>

      {/* Button Container */}
      <div className="flex flex-row gap-4 w-full max-w-md">
        <button className="bg-white text-black py-2 px-6 text-lg flex items-center justify-center gap-2 rounded-lg hover:bg-opacity-80 transition-all flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-black"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>
        <button className="bg-gray-500/50 text-white py-2 px-6 text-lg rounded-lg hover:bg-opacity-80 transition-all flex-1">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
