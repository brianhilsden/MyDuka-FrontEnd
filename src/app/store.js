
import productReducer from '../features/productSlice';
import userReducer from "../features/userSlice"
import truthValueReducer from "../features/truthValueSlice"
import storeAdminReducer from '../features/storeAdminSlice';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user:userReducer,
    truthValue:truthValueReducer,
    admin: adminReducer,
    storeAdmin:storeAdminReducer

  },
});

