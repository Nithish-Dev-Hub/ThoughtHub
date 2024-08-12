import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getBlog = createAsyncThunk(
    'auth/getBlog',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:3300/api/page/blogs", {
            withCredentials: true // Ensure cookies are sent with the request
          }); // Adjust the API endpoint as needed
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const getuserBlog = createAsyncThunk(
  'auth/getuserBlog',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3300/api/page/myblogs", {
          withCredentials: true // Ensure cookies are sent with the request
        }); // Adjust the API endpoint as needed
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (blogData, {rejectWithValue}) =>{
    try {
      const response = await axios.post("http://localhost:3300/api/blog/create", 
        blogData,
        {
          withCredentials: true // Ensure cookies are sent with the request
        }); // Adjust the API endpoint as needed
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
    name: "BlogPost",
    initialState:{
        data: null,
        loading: false,
        error: null,
        newBlog:null,
        createStatus: "",
        userBlog: null
    },
    extraReducers: (builder) => {
        builder
          .addCase(getBlog.pending, (state, action) => {
            state.data= null;
            state.loading= true;
            state.error= null;
          })
          .addCase(getBlog.fulfilled, (state, action) => {
            state.data= action.payload;
            state.loading= false;
            state.error= null;
          })
          .addCase(getBlog.rejected, (state, action) => {
            state.userBlog= null;
            state.loading= false;
            state.error= action.payload;
          })
          .addCase(getuserBlog.pending, (state, action) => {
            state.userBlog= null;
            state.loading= true;
            state.error= null;
          })
          .addCase(getuserBlog.fulfilled, (state, action) => {
            state.userBlog= action.payload;
            state.loading= false;
            state.error= null;
          })
          .addCase(getuserBlog.rejected, (state, action) => {
            state.data= null;
            state.loading= false;
            state.error= action.payload;
          })
          .addCase(createPost.pending, (state, action) => {
            state.newBlog= null;
            state.loading= true;
            state.error= null;
          })
          .addCase(createPost.fulfilled, (state, action) => {
            state.newBlog= action.payload;
            state.loading= false;
            state.error= null;
            state.createStatus = "Success";
          })
          .addCase(createPost.rejected, (state, action) => {
            state.newBlog= null;
            state.loading= false;
            state.error= action.payload;
            state.createStatus = "Failed";
          });

    }
});

export default blogSlice.reducer;