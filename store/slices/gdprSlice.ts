import { createSlice } from "@reduxjs/toolkit";

interface GDPRState {
  consentGiven: boolean;
}

const initialState: GDPRState = {
  consentGiven: false,
};

const gdprSlice = createSlice({
  name: "gdpr",
  initialState,
  reducers: {
    giveConsent(state) {
      state.consentGiven = true;
    },
    resetConsent(state) {
      state.consentGiven = false;
    },
  },
});

export const { giveConsent, resetConsent } = gdprSlice.actions;
export default gdprSlice.reducer;
