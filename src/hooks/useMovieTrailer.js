import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const abortController = new AbortController();
        const getMovieVideo = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
                    { ...API_OPTIONS, signal: abortController.signal }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const json = await response.json();
                const trailer = json.results.find(
                    (video) => video.type === 'Trailer'
                );

                if (trailer) {
                    dispatch(addTrailerVideo(trailer));
                } else if (!trailer) {
                    console.warn('No trailer found for the movie.');
                }
            } catch (error) {
                console.error('Error fetching movie trailer:', error.message);
            }
        };

        getMovieVideo();

        // Cleanup function
        return () => {
            abortController.abort();
        };
    }, []);
};

export default useMovieTrailer;
