import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  users: [],
  suggested_users: [],
  close_friends: [],
  user_profile: {},
  invalid_user_profile: false,
  loading: false,
  follow_loading: false,
  loader: false,
  followed: false,
};

export const SearchedUsers = createAsyncThunk(
  "users/searched",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(
        `${BaseUrl}api/users/search?username=${payload.username}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
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
        withCredentials: true,
      });
      return fulfillWithValue(res.data);
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
        withCredentials: true,
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
        withCredentials: true,
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
      const res = await axios.get(
        `${BaseUrl}api/users/suggested_users?num=${payload.num}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const savePost = createAsyncThunk(
  "users/savePost",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.patch(
        `${BaseUrl}api/users/save_post/${payload.postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CloseFriend = createAsyncThunk(
  "users/CloseFriend",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.patch(
        `${BaseUrl}api/users/close_friend/${payload.friendId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserCloseFriends = createAsyncThunk(
  "users/getUserCloseFriends",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(
        `${BaseUrl}api/users/close_friend/${payload.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
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
      state.user_profile = action.payload.user;
    },
    [userProfile.rejected]: (state, action) => {
      state.loading = false;
      state.invalid_user_profile = true;
      toast.error(action?.payload?.message, options);
    },
    [suggestedUsers.pending]: (state, action) => {
      state.loader = true;
    },
    [suggestedUsers.fulfilled]: (state, action) => {
      state.loader = false;
      state.suggested_users = action.payload.users;
    },
    [suggestedUsers.rejected]: (state, action) => {
      state.loader = false;
      toast.error(action?.payload?.message, options);
    },
    [followUser.pending]: (state, action) => {
      state.follow_loading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.follow_loading = false;
      state.followed = Math.random();
      toast.success(action?.payload?.message, options);
    },
    [followUser.rejected]: (state, action) => {
      state.follow_loading = false;
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
    [unfollowUser.pending]: (state, action) => {
      state.follow_loading = true;
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.follow_loading = false;
      state.followed = Math.random();
      toast.success(action?.payload?.message, options);
    },
    [unfollowUser.rejected]: (state, action) => {
      state.follow_loading = false;
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
    [savePost.pending]: (state, action) => {},
    [savePost.fulfilled]: (state, action) => {
      toast.success(action?.payload?.message, options);
    },
    [savePost.rejected]: (state, action) => {
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
    [CloseFriend.pending]: (state, action) => {},
    [CloseFriend.fulfilled]: (state, action) => {
      toast.success(action?.payload?.message, options);
    },
    [CloseFriend.rejected]: (state, action) => {
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
    [getUserCloseFriends.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserCloseFriends.fulfilled]: (state, action) => {
      state.loading = false
      state.close_friends = action.payload.close_friends
      toast.success(action?.payload?.message, options);
    },
    [getUserCloseFriends.rejected]: (state, action) => {
      state.loading = false
      toast.error(
        action?.payload?.message || "Something went wrong!!",
        options
      );
    },
  },
});

export default users.reducer;
