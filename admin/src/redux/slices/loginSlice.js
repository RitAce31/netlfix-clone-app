import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const login = loginSlice.reducer;
export const { changeUser } = loginSlice.actions;
