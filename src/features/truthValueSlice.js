import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  truthValue: false,
};

const truthValueSlice = createSlice({
  name: "truthValue",
  initialState,
  reducers: {
    switchTruthValue(state) {
      state.truthValue = !state.truthValue;
    },
  },
});

export const { switchTruthValue } = truthValueSlice.actions;
export default truthValueSlice.reducer;
