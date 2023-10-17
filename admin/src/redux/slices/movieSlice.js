import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    changeMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const movies = movieSlice.reducer;
export const { changeMovies } = movieSlice.actions;
