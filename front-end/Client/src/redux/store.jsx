import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import DrawerManagerSlice from "./slices/DrawerManagerSlice";
import CartManagerSlice from "./slices/CartManagerSlice";
import UserManagerSlice from "./slices/UserManagerSlice";
import LoadingManagerSlice from "./slices/LoadingManagerSlice";

const rootReducer = combineReducers({
  DrawerManager: DrawerManagerSlice.reducer,
  CartManager: CartManagerSlice.reducer,
  UserManager: UserManagerSlice.reducer,
  LoadingManager: LoadingManagerSlice.reducer,
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
