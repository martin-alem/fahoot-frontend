import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResetPasswordPayload, IResetPasswordRequestPayload } from "../utils/types";

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const securityApi = createApi({
  reducerPath: "securityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/security`,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    resetPasswordRequest: builder.mutation({
      query: (payload: IResetPasswordRequestPayload) => ({
        url: "/password_reset_request",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload: IResetPasswordPayload) => ({
        url: "/password_reset",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useResetPasswordRequestMutation, useResetPasswordMutation } = securityApi;
