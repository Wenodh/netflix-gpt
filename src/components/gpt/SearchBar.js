import React, { useRef } from 'react';
import lang from '../../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { openai } from '../../utils/openai';
import { API_OPTIONS } from '../../utils/constants';
import { addGptMovieResult } from '../../utils/gptSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const language = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            'https://api.themoviedb.org/3/search/movie?query=' +
                movie +
                '&include_adult=false&language=en-US&page=1',
            API_OPTIONS
        );
        const json = await data.json();

        return json.results;
    };
    const handleGptSearchClick = async () => {
        try {
            const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query ${searchText.current.value}. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Hanuman, sholay, Don, ABCD & RRR`;
            const response = await openai.chat.completions.create({
                message: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo',
            });
            const gptMovies =
                response.choices?.[0]?.message?.content.split(',');

            const promiseArray = gptMovies.map((movie) =>
                searchMovieTMDB(movie)
            );
            const tmdbResults = await Promise.all(promiseArray);
            dispatch(
                addGptMovieResult({
                    movieNames: gptMovies,
                    movieResults: tmdbResults,
                })
            );
        } catch (err) {
            console.log(err);
            const gptMovies = [
                'RRR',
                'Eega',
                'HanuMan',
                'Guntur kaaram',
                'Salaar',
            ];
            const promiseArray = gptMovies.map((movie) =>
                searchMovieTMDB(movie)
            );
            const tmdbResults = await Promise.all(promiseArray);
            dispatch(
                addGptMovieResult({
                    movieNames: gptMovies,
                    movieResults: tmdbResults,
                })
            );
        }
    };

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form
                className="w-full m-2 md:w-1/2 bg-black grid grid-cols-12"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchText}
                    type="text"
                    className="p-2 m-2 md:p-4 md:m-4 col-span-9 text-black"
                    placeholder={lang[language].gptSearchPlaceHolder}
                />
                <button
                    className="my-2 px-2 mr-2 md:my-4 md:px-4 md:mr-4 bg-red-700 col-span-3 rounded"
                    onClick={handleGptSearchClick}
                >
                    {lang[language].search}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
