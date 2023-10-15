import { createSlice } from "@reduxjs/toolkit";

const dataStructure = {
  user: JSON.parse(JSON.stringify(localStorage.getItem("user"))) || null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: dataStructure,
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const login = loginSlice.reducer;
export const { changeUser } = loginSlice.actions;
