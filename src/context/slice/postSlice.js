import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../services/BaseUrl";
import { toast } from "react-toastify";
import { options } from "../../utils/ToastOptions";

const initialState = {
  //total posts
  posts: [],
  likes: [],
  saved: [],
  results: 0,

  // user posts
  user_posts: [],
  user_likes: [],

  // explore posts
  explore_posts: [],
  explore_likes: [],
  explore_saved: [],

  //recommended posts
  recommended_posts: [],
  recommended_likes: [],
  recommended_saved: [],

  //saved posts
  savedPostsloading: false,
  saved_posts: [],
  saved_posts_likes: [],
  saved_posts_saved: [],
  images: [],
  post: {},
  loading: false,
  image_loading: false,
  creating: false,
  deleting: false
};

export const Create_Post = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.post(`${BaseUrl}api/posts/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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
      const res = await axios.get(
        `${BaseUrl}api/posts/allimages/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUserPosts = createAsyncThunk(
  "posts/getAllUserPosts",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(
        `${BaseUrl}api/posts/your-posts/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
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
      const res = await axios.get(`${BaseUrl}api/posts/all-posts/?page=${payload.page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
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
        withCredentials: true,
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
          withCredentials: true,
        }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ExplorePosts = createAsyncThunk(
  "posts/ExplorePosts",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/posts/explore`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const RecommendedPosts = createAsyncThunk(
  "posts/RecommendedPosts",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/posts/recommended`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const savedPosts = createAsyncThunk(
  "posts/savedPosts",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.get(`${BaseUrl}api/users/save_post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeletePost = createAsyncThunk(
  "posts/DeletePost",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    const token = getState()?.auth?.user?.access_token;
    try {
      const res = await axios.delete(`${BaseUrl}api/posts/${payload.postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
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
      state.creating = true;
    },
    [Create_Post.fulfilled]: (state, action) => {
      state.creating = false;
      toast.success(action?.payload?.message, options);
    },
    [Create_Post.rejected]: (state, action) => {
      state.creating = false;
      toast.error(action?.payload?.message, options);
    },
    [getAllImages.pending]: (state, action) => {
      state.image_loading = true;
    },
    [getAllImages.fulfilled]: (state, action) => {
      state.image_loading = false;
      state.images = action.payload.images;
    },
    [getAllImages.rejected]: (state, action) => {
      state.image_loading = false;
      toast.error(action?.payload?.message, options);
    },
    [getAllUserPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUserPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.user_posts = action.payload.posts;
      state.user_likes = action.payload.likes;
    },
    [getAllUserPosts.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [Posts.pending]: (state, action) => {
      state.loading = true;
    },
    [Posts.fulfilled]: (state, action) => {
      state.loading = false;
      state.results = action.payload.results;
      state.posts = action.payload.posts;
      state.likes = action.payload.likes;
      state.saved = action.payload.saved;
    },
    [Posts.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [ExplorePosts.pending]: (state, action) => {
      state.loading = true;
    },
    [ExplorePosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.explore_posts = action.payload.posts;
      state.explore_likes = action.payload.likes;
      state.explore_saved = action.payload.saved;
    },
    [ExplorePosts.rejected]: (state, action) => {
      state.loading = false;
      toast.error(action?.payload?.message, options);
    },
    [RecommendedPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [RecommendedPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.recommended_posts = action.payload.recommended;
      state.recommended_likes = action.payload.likes;
      state.recommended_saved = action.payload.saved;
    },
    [RecommendedPosts.rejected]: (state, action) => {
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
    [savedPosts.pending]: (state, action) => {
      state.savedPostsloading = true;
    },
    [savedPosts.fulfilled]: (state, action) => {
      state.savedPostsloading = false;
      state.saved_posts = action.payload.savedPosts;
      state.saved_posts_likes = action.payload.likes;
      state.saved_posts_saved = action.payload.saved;
    },
    [savedPosts.rejected]: (state, action) => {
      state.savedPostsloading = false;
      toast.error(action?.payload?.message, options);
    },
    [DeletePost.pending]: (state, action) => {
      state.deleting = true;
    },
    [DeletePost.fulfilled]: (state, action) => {
      state.deleting = false;
      toast.error(action?.payload?.message, options);
    },
    [DeletePost.rejected]: (state, action) => {
      state.deleting = false;
      toast.error(action?.payload?.message, options);
    },
  },
});

export default posts.reducer;
