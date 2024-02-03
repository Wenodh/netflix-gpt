import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        movies.now_playing && (
            <div className="bg-black">
                <div className="-mt-[20%] relative z-10">
                    <MovieList
                        title={'Now Playing'}
                        movies={movies.now_playing}
                    />
                    <MovieList title={'Top Rated'} movies={movies.top_rated} />
                    <MovieList title={'Popular'} movies={movies.popular} />
                    <MovieList title={'Upcoming'} movies={movies.upcoming} />
                </div>
            </div>
        )
    );
};

export default SecondaryContainer;
