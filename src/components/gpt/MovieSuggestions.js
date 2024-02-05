import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from '../MovieList';
const MovieSuggestions = () => {
    const { movieResults, movieNames } = useSelector((store) => store.gpt);
    if (!movieNames) return null;
    return (
        <div className="p-4 bg-black text-white bg-opacity-80">
            <div>
                {movieNames.map((movieName, index) => (
                    <MovieList
                        key={movieName}
                        title={movieName}
                        movies={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieSuggestions;
