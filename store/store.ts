import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "./services/api";
import scanReducer from "./slices/scanSlice";
import settingsReducer from "./slices/settingsSlice";
import gdprReducer from "./slices/gdprSlice";

// Configure persist for the settings slice
const settingsPersistConfig = {
  key: "settings",
  storage: AsyncStorage,
};

// Configure persist for the GDPR slice
const gdprPersistConfig = {
  key: "gdpr",
  storage: AsyncStorage,
};

const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settingsReducer
);

const persistedGDPRReducer = persistReducer(gdprPersistConfig, gdprReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    scan: scanReducer,
    settings: persistedSettingsReducer, // Use the persisted reducer for settings
    gdpr: persistedGDPRReducer, // Use the persisted reducer for GDPR
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
