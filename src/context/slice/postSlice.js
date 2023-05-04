import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  posts: [],
  images: [],
  loading: false,
};

export const Create_Post = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      let formdata = new FormData();
      formdata.append("content", payload.content);
      Array.from(payload.images).map((item) => formdata.append("images", item));
      console.log(formdata);
      const res = await axios.post(`${BaseUrl}api/posts/`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllImages = createAsyncThunk(
  "posts/getAllImages",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/posts/allimages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Posts = createAsyncThunk(
  "posts/getAllPosts",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [Create_Post.pending]: (state, action) => {
      state.loading = true;
    },
    [Create_Post.fulfilled]: (state, action) => {
      state.loading = false;
      toast.success(action?.payload?.message, options);
    },
    [Create_Post.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [getAllImages.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.images = action.payload.images
    },
    [getAllImages.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [Posts.pending]: (state, action) => {
      state.loading = true;
    },
    [Posts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts
    },
    [Posts.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
  },
});

export default posts.reducer;
