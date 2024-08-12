import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import blogReducer from '../slices/blogSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer
  },
});

export default store;
