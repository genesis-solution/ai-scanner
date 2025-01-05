// store/settingsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  language: "en" | "de";
  theme: "light" | "dark";
}

const initialState: SettingsState = {
  language: "en",
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { setLanguage, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
