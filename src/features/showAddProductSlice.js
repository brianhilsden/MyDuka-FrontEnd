import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: false
  };
  
  const showAddProductSlice = createSlice({
    name: 'showAddProduct',
    initialState,
        reducers: {
            showAddProduct(state,action){
                state.mode = action.payload !== undefined ? action.payload : !state.mode
            }
        
      
    },
  });
  
  export const { showAddProduct} = showAddProductSlice.actions;
  export default showAddProductSlice.reducer 