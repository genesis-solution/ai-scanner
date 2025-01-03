import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "./services/api";
import scanReducer from "./slices/scanSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    scan: scanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
