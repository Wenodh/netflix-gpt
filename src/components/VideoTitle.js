import React from 'react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[20%] bg-gradient-to-r  text-white p-4 absolute from-black ">
            <h1 className="md:text-5xl font-bold">{title}</h1>
            <p className="my-2 md:my-6 w-1/2 md:w-2/6 text-xs md:text-lg line-clamp-2 md:line-clamp-4 max-h-32 overflow-hidden">
                {overview}
            </p>
            <div className="text-sm md:text-xl">
                <button className="text-black py-1 px-2 md:p-4 md:px-10 rounded-lg bg-white hover:opacity-70">
                    ▶ Play
                </button>
                <button className="hidden md:inline-block text-white md:p-4 md:px-10 rounded-lg bg-gray-500 mx-2 hover:opacity-70">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
