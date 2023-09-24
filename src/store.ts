import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authUserReducer from "./slices/auth.slice";
import { authApi } from "./api/auth.api";
import { userApi } from "./api/user.api";
import { securityApi } from "./api/security.api";
import { uploadApi } from "./api/upload.api";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, securityApi.middleware, uploadApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
