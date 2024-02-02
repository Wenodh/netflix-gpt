import React from 'react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[20%] bg-gradient-to-r  text-white p-4 absolute from-black ">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="my-6 w-2/6 text-lg line-clamp-4 max-h-32 overflow-hidden">
                {overview}
            </p>
            <div>
                <button className="text-black p-4 px-10 text-xl rounded-lg bg-white hover:opacity-70">
                    ▶ Play
                </button>
                <button className="text-white p-4 px-10 text-xl rounded-lg bg-gray-500 mx-2 hover:opacity-70">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
