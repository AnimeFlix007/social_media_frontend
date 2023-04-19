import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const mode = createSlice({
  name: "mode",
  initialState,
  reducers: {
    togglemode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { togglemode } = mode.actions;
export default mode.reducer;
