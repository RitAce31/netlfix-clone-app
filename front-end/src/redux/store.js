import { configureStore } from "@reduxjs/toolkit";
import { netflixSlice } from "./slices/netflixSlice";
import { login } from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    netflixData: netflixSlice,
    login: login,
  },
});

export default store;
