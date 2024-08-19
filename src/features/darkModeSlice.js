import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: false
  };
  
  const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
        reducers: {
            switchMode(state,action){
                state.mode = action.payload !== undefined ? action.payload : !state.mode
            }
        
      
    },
  });
  
  export const { switchMode} = darkModeSlice.actions;
  export default darkModeSlice.reducer 