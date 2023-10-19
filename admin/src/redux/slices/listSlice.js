import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  lists: null,
};

const listSlice = createSlice({
  name: "lists",
  initialState: initialState,
  reducers: {
    changeList: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const lists = listSlice.reducer;
export const { changeList } = listSlice.actions;
