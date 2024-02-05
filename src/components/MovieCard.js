import React from 'react';
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({ poster }) => {
    return (
        <div className="w-28 md:w-48">
            <img src={IMG_CDN_URL + poster} alt="" />
        </div>
    );
};

export default MovieCard;
