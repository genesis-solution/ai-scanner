// store/settingsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  language:
    | "en"
    | "de"
    | "es"
    | "fr"
    | "zh"
    | "ar"
    | "hi"
    | "pt"
    | "ru"
    | "ja"
    | "it";
  theme:
    | "white"
    | "lightGrayishBlue"
    | "lightBlue"
    | "pastelGreen"
    | "softBlue"
    | "warmAmber";
}

const initialState: SettingsState = {
  language: "en",
  theme: "lightBlue",
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
