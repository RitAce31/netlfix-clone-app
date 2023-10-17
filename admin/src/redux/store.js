import { configureStore } from "@reduxjs/toolkit";
import { login } from "./slices/loginSlice";
import { movies } from "./slices/movieSlice";

const store = configureStore({
  reducer: {
    login: login,
    movies: movies,
  },
});

export default store;
