import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import {
    addNowPlayingMovies,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies,
} from '../utils/moviesSlice';

const useGetMovies = () => {
    const dispatch = useDispatch();
    const isCached = useSelector((store) => store.movies);
    const requiredMoviesList = [
        {
            key: 'now_playing',
            action: addNowPlayingMovies,
        },
        {
            key: 'top_rated',
            action: addTopRatedMovies,
        },
        {
            key: 'popular',
            action: addPopularMovies,
        },
        {
            key: 'upcoming',
            action: addUpcomingMovies,
        },
    ];

    const fetchMovies = async (key, action) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${key}?page=1`,
                API_OPTIONS
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            dispatch(action(json.results));
        } catch (error) {
            console.error('Error fetching movies:', error.message);
        }
    };

    useEffect(() => {
        requiredMoviesList.forEach(({ key, action }) => {
            if (!isCached?.[key]) {
                fetchMovies(key, action);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useGetMovies;
