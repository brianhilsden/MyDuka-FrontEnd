
import productReducer from '../features/productSlice';
import userReducer from "../features/userSlice"
import truthValueReducer from "../features/truthValueSlice"

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user:userReducer,
    truthValue:truthValueReducer

  },
});

