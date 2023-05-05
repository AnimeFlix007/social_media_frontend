import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  users: [],
  suggested_users: [],
  user_profile: {},
  invalid_user_profile: false,
  loading: false,
  follow_loading: false,
  followed: false
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

export const followUser = createAsyncThunk(
  "users/followUser",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    console.log(token);
    try {
      const res = await axios.patch(`${BaseUrl}api/users/follow`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.patch(`${BaseUrl}api/users/unfollow`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const suggestedUsers = createAsyncThunk(
  "users/suggestedUsers",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/users/suggested_users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return fulfillWithValue(res.data);
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
    [suggestedUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [suggestedUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.suggested_users = action.payload.users;
    },
    [suggestedUsers.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [followUser.pending]: (state, action) => {
      state.follow_loading = true
    },
    [followUser.fulfilled]: (state, action) => {
      state.follow_loading = false
      state.followed = Math.random()
      toast.success(action?.payload?.message, options);
    },
    [followUser.rejected]: (state, action) => {
      state.follow_loading = false
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
    [unfollowUser.pending]: (state, action) => {
      state.follow_loading = true
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.follow_loading = false
      state.followed = Math.random()
      toast.success(action?.payload?.message, options);
    },
    [unfollowUser.rejected]: (state, action) => {
      state.follow_loading = false
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
  },
});

export default users.reducer;
