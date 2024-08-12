import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3300/user/register', userData, {
        withCredentials: true // Ensure cookies are sent with the request
      });// Adjust the API endpoint as needed
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3300/user/login', userData, // This is the data payload
          {
            withCredentials: true, // This ensures cookies are sent with the request
          }); // Adjust the API endpoint as needed
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:3300/user/logout', {
          withCredentials: true // Ensure cookies are sent with the request
        }); // Adjust the API endpoint as needed
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('http://localhost:3300/user/profile', 
      {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "Authorize",
  initialState: {
    user: null,
    loading: false,
    error: null,
    loggedIn: false,
  },
  reducers: {
    // You can still use the registerForm reducer if needed
    registerForm(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;        

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loggedIn = false;
      })
      .addCase(loginUser.pending, (state, action)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.loggedIn = false;
      })
      .addCase(logoutUser.pending, (state, action)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = null;
        state.loggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.loggedIn = false;
      })
      .addCase(getProfile.pending, (state, action)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getProfile.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.loggedIn = false;
      });
  },
});

export const { registerForm } = authSlice.actions;
export default authSlice.reducer;
