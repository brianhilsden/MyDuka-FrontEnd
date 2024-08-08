import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  packages: [],
  currentPackage: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addPackage(state, action) {
      state.packages.push(action.payload);
    },
    setCurrentPackage(state, action) {
      state.currentPackage = action.payload;
    },
    clearCurrentPackage(state) {
      state.currentPackage = null;
    },
  },
});

export const { addPackage, setCurrentPackage, clearCurrentPackage } = productSlice.actions;
export default productSlice.reducer;