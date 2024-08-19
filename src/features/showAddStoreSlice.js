import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: false
  };
  
  const showAddStoreSlice = createSlice({
    name: 'showAddStore',
    initialState,
        reducers: {
            showAddStore(state,action){
                state.mode = action.payload !== undefined ? action.payload : !state.mode
            }
        
      
    },
  });
  
  export const { showAddStore} = showAddStoreSlice.actions;
  export default showAddStoreSlice.reducer 