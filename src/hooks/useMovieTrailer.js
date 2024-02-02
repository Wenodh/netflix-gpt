import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getMovieVideo();
    }, []);
    const getMovieVideo = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            API_OPTIONS
        );
        const json = await data.json();
        const trailer = json.results.find((movie) => movie.type === 'Trailer');
        dispatch(addTrailerVideo(trailer));
    };
};

export default useMovieTrailer;
