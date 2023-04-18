import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";

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
      console.log(res.data, "19");
      localStorage.setItem("vmediauser", {
        token: res.data.access_token,
        user: res.data?.user,
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      console.log(error.response.data, "28");
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
      state.user = action?.payload?.user;
      toast.success(action?.payload?.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    [authLogin.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  },
});

export default authSlice.reducer;
