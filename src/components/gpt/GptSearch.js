import React from 'react';
import SearchBar from './SearchBar';
import MovieSuggestions from './MovieSuggestions';
import { BG_URL } from '../../utils/constants';

const GptSearch = () => {
    return (
        <div className="text-white">
            <div className="fixed -z-10 ">
                <img
                    className=" h-screen w-screen object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>
            <SearchBar />
            <MovieSuggestions />
        </div>
    );
};

export default GptSearch;
