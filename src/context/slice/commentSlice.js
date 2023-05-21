import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  comments: [],
  loading: false,
};

export const AddComment = createAsyncThunk(
  "users/AddComment",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.post(
        `${BaseUrl}api/comments/${payload.postId}`,
        { content: payload.content },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostComments = createAsyncThunk(
  "users/getPostComments",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(
        `${BaseUrl}api/comments/${payload.postId}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "users/deleteComment",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.delete(
        `${BaseUrl}api/comments/${payload.commentId}`,
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [AddComment.pending]: (state, action) => {
      state.loading = true;
    },
    [AddComment.fulfilled]: (state, action) => {
      state.loading = false;
      toast.info(action?.payload?.message, options);
    },
    [AddComment.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [getPostComments.pending]: (state, action) => {
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action?.payload.comments;
      toast.info(action?.payload?.message, options);
    },
    [getPostComments.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [deleteComment.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.loading = false;
      toast.info(action?.payload?.message, options);
    },
    [deleteComment.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
  },
});

export default comments.reducer;
