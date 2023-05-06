import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  posts: [],
  likes: [],
  images: [],
  post: {},
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

export const SinglePost = createAsyncThunk(
  "posts/SinglePost",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/posts/${payload.id}`, {
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

export const LikePost = createAsyncThunk(
  "posts/LikePost",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    console.log(token);
    try {
      const res = await axios.patch(
        `${BaseUrl}api/posts/like/${payload.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      state.images = action.payload.images;
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
      state.posts = action.payload.posts;
      state.likes = action.payload.likes;
    },
    [Posts.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [SinglePost.pending]: (state, action) => {
      state.loading = true;
    },
    [SinglePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload.post;
    },
    [SinglePost.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [LikePost.pending]: (state, action) => {},
    [LikePost.fulfilled]: (state, action) => {
      toast.info(action?.payload?.message, options);
    },
    [LikePost.rejected]: (state, action) => {
      toast.error(action?.payload?.message, options);
    },
  },
});

export default posts.reducer;
