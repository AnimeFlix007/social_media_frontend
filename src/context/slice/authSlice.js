import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const userLoggedIn = localStorage.getItem("vmediauser")
  ? JSON.parse(localStorage.getItem("vmediauser"))
  : null;

const initialState = {
  user: userLoggedIn,
  loading: false,
};

export const authLogin = createAsyncThunk(
  "auth/login",
  async (
    payload,
    { getState, rejectWithValue, dispatch, fulfillWithValue }
  ) => {
    try {
      const res = await axios.post(`${BaseUrl}api/auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem(
        "vmediauser",
        JSON.stringify({
          token: res.data.access_token,
          user: res.data?.user,
        })
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (
    payload,
    { getState, rejectWithValue, dispatch, fulfillWithValue }
  ) => {
    try {
      const res = await axios.post(`${BaseUrl}api/auth/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [authLogin.pending]: (state, action) => {
      state.loading = true;
    },
    [authLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      toast.success(action?.payload?.message, options);
    },
    [authLogin.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [authRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [authRegister.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success(action?.payload?.message, options);
    },
    [authRegister.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
  },
});

export default authSlice.reducer;
