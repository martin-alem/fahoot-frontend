import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IManualSignInPayload, IManualSignupPayload } from "../utils/types";

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    manualSignUp: builder.mutation({
      query: (payload: IManualSignupPayload) => ({
        url: "/authentication/signup",
        method: "POST",
        body: payload,
      }),
    }),

    manualSignIn: builder.mutation({
      query: (payload: IManualSignInPayload) => ({
        url: "/authentication/signin",
        method: "POST",
        body: payload,
      }),
    }),

    autoLogin: builder.mutation({
      query: () => ({
        url: "/authentication/auto_login",
        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/authentication/logout",
        method: "DELETE",
      }),
    }),

    clearRememberMe: builder.mutation({
      query: () => ({
        url: "/authentication/remember_me",
        method: "DELETE",
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useManualSignUpMutation, useManualSignInMutation, useLogoutMutation, useAutoLoginMutation, useClearRememberMeMutation, useGetUserQuery } = authApi;
