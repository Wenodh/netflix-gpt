import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
    const trailer = useSelector((store) => store.movies?.trailerVideo);
    useMovieTrailer(movieId);
    if (!trailer) return;

    return (
        <iframe
            className="w-screen aspect-video"
            src={`https://www.youtube.com/embed/${trailer?.key}?&autoplay=1&mute=1&controls=0&modestbranding=1&loop=1`}
            title={trailer?.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
    );
};

export default VideoBackground;
