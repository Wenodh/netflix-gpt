import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        now_playing: null,
        trailerVideo: null,
        top_rated: null,
        popular: null,
        upcoming: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.now_playing = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.top_rated = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popular = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcoming = action.payload;
        },
    },
});
export const {
    addNowPlayingMovies,
    addTrailerVideo,
    addTopRatedMovies,
    addUpcomingMovies,
    addPopularMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
