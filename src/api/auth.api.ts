import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGoogleOAuthPayload, IManualSignInPayload, IManualSignupPayload } from '../utils/types';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/authentication`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    manualSignUp: builder.mutation({
      query: (payload: IManualSignupPayload) => ({
        url: '/signup',
        method: 'POST',
        body: payload,
      }),
    }),

    manualSignIn: builder.mutation({
      query: (payload: IManualSignInPayload) => ({
        url: '/signin',
        method: 'POST',
        body: payload,
      }),
    }),

    googleSignIn: builder.mutation({
      query: (payload: IGoogleOAuthPayload) => ({
        url: '/google_signin',
        method: 'POST',
        body: payload,
      }),
    }),

    autoLogin: builder.mutation({
      query: () => ({
        url: '/auto_login',
        method: 'POST',
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
    }),

    clearRememberMe: builder.mutation({
      query: () => ({
        url: '/remember_me',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useManualSignUpMutation, useGoogleSignInMutation, useManualSignInMutation, useLogoutMutation, useAutoLoginMutation, useClearRememberMeMutation } = authApi;
