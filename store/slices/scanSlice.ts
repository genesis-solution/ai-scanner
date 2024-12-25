import { createSlice } from "@reduxjs/toolkit";

// Define initial state data type here
type InitialStateType = {
  content: string | null;
};

const initialState: InitialStateType = {
  content: null,
};

const scanSlice = createSlice({
  name: "scan",
  initialState,
  reducers: {
    setContent: (state, action) => {
      if (action.payload) {
        state.content = action.payload;
      }
    },
  },
});

export const { setContent } = scanSlice.actions;
export default scanSlice.reducer;
