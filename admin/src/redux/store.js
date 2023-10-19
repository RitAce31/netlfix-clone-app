import { configureStore } from "@reduxjs/toolkit";
import { login } from "./slices/loginSlice";
import { movies } from "./slices/movieSlice";
import { lists } from "./slices/listSlice";

const store = configureStore({
  reducer: {
    login: login,
    movies: movies,
    lists: lists,
  },
});

export default store;
