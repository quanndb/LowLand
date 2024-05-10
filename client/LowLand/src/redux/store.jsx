import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import DrawerManagerSlice from "./slices/DrawerManagerSlice";
import PagesSlice from "./slices/PagesSlice";

const rootReducer = combineReducers({
  DrawerManager: DrawerManagerSlice.reducer,
  PagesSlice: PagesSlice.reducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
