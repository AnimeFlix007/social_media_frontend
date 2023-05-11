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
        { payload },
        { headers: { Authorization: `Bearer ${token}` } }
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
  },
});

export default comments.reducer;
