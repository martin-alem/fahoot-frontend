import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authUserReducer from './slices/auth.slice';
import quizReducer from './slices/quiz.slice';
import playReducer from './slices/play.slice';
import { authApi } from './api/auth.api';
import { userApi } from './api/user.api';
import { securityApi } from './api/security.api';
import { uploadApi } from './api/upload.api';
import { quizApi } from './api/quiz.api';
import { playApi } from './api/play.api';
import { playerApi } from './api/player.api';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    quizState: quizReducer,
    playState: playReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [securityApi.reducerPath]: securityApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [playApi.reducerPath]: playApi.reducer,
    [playerApi.reducerPath]: playerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, securityApi.middleware, uploadApi.middleware, quizApi.middleware, playApi.middleware, playerApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
