
import productReducer from '../features/productSlice';
import userReducer from "../features/userSlice"
import truthValueReducer from "../features/truthValueSlice"
import storeAdminReducer from '../features/storeAdminSlice';
import darkModeReducer from '../features/darkModeSlice';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import adminReducer from '../features/adminSlice';
import showAddProductReducer from '../features/showAddProductSlice';
import showAddStoreReducer from '../features/showAddStoreSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode:darkModeReducer,
    product: productReducer,
    user:userReducer,
    truthValue:truthValueReducer,
    admin: adminReducer,
    storeAdmin:storeAdminReducer,
    showAddProduct:showAddProductReducer,
    showAddStore:showAddStoreReducer

  },
});

