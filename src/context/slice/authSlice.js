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
        withCredentials: true,
      });
      localStorage.setItem(
        "vmediauser",
        JSON.stringify({
          access_token: res.data.access_token,
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
        withCredentials: true,
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authRefreshToken = createAsyncThunk(
  "auth/refresh_token",
  async (
    payload = {},
    { getState, rejectWithValue, dispatch, fulfillWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${BaseUrl}api/auth/refresh_token`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.setItem(
        "vmediauser",
        JSON.stringify({
          access_token: res.data.access_token,
          user: res.data?.user,
        })
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  async (
    payload = {},
    { getState, rejectWithValue, dispatch, fulfillWithValue }
  ) => {
    try {
      const res = await axios.post(`${BaseUrl}api/auth/logout`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      localStorage.removeItem("vmediauser");
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.patch(
        `${BaseUrl}api/users/${payload.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const strData = JSON.parse(localStorage.getItem("vmediauser"));
      const data = {
        ...strData,
        user: res.data.user
      }
      localStorage.setItem("vmediauser", JSON.stringify(data))
      return fulfillWithValue(data);
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
    [authRefreshToken.pending]: (state, action) => {
      // state.loading = true;
    },
    [authRefreshToken.fulfilled]: (state, action) => {
      state.user = action?.payload;
      toast.success(action?.payload?.message, options);
    },
    [authRefreshToken.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [authLogout.pending]: (state, action) => {
      state.loading = true;
    },
    [authLogout.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = {};
      toast.success(action?.payload?.message, options);
    },
    [authLogout.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [editProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [editProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      toast.success("Profile Updated Successfully", options);
    },
    [editProfile.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
  },
});

export default authSlice.reducer;
