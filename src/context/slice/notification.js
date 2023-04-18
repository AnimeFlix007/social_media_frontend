import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";

const initialState = {
  message: "",
  type: "success",
  open: false,
};

const notification = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

const {} = authSlice.actions;

export default authSlice.reducer;
