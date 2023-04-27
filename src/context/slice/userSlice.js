import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  users: [],
  user_profile: {},
  invalid_user_profile: false,
  loading: false,
};

export const SearchedUsers = createAsyncThunk(
  "users/searched",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(
        `${BaseUrl}api/users/search?username=${payload.username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return fulfillWithValue(res.data.users);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userProfile = createAsyncThunk(
  "users/getUserProfile",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/users/${payload.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return fulfillWithValue(res.data.user);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [SearchedUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [SearchedUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [SearchedUsers.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [userProfile.pending]: (state, action) => {
      state.loading = true;
      state.invalid_user_profile = false;
    },
    [userProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.invalid_user_profile = false;
      state.user_profile = action.payload;
    },
    [userProfile.rejected]: (state, action) => {
      state.loading = false;
      state.invalid_user_profile = true;
      toast.error(action?.payload?.message, options);
    },
  },
});

export default users.reducer;
