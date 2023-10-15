import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

const netflixReducer = createSlice({
  name: "netflixReducer",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const netflixSlice = netflixReducer.reducer;
export const { setAccessToken } = netflixReducer.actions;
