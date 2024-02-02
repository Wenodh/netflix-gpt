import React, { useEffect } from 'react';
import Header from './Header';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
    useNowPlayingMovies();
    return (
        <div>
            <Header />
            <MainContainer />
            <SecondaryContainer />
            {
                //     MainContainer
                //     - VideoBackGround
                //     - VideoTitle
                //     SecondaryContainer
                // - MoviesList * n
                // - cards * n
            }
        </div>
    );
};

export default Browse;
