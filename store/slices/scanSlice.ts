import { createSlice } from "@reduxjs/toolkit";

// Define initial state data type here
type InitialStateType = {
  content: string | null;
  keywords: string[];
};

const initialState: InitialStateType = {
  content: null,
  keywords: [],
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
    setKeywords: (state, action) => {
      if (action.payload) {
        state.keywords = action.payload;
      }
    },
  },
});

export const { setContent, setKeywords } = scanSlice.actions;
export default scanSlice.reducer;
