import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies) return;
    const randomMovieIdx = Math.floor(Math.random() * (movies.length - 1));
    const mainMovie = movies[randomMovieIdx];
    const { original_title, overview, id } = mainMovie;
    return (
        <div className="pt-[30%] bg-black md:pt-0">
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    );
};

export default MainContainer;
