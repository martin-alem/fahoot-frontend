import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUpdateBasicInfoPayload } from "../utils/types";

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/user`,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),

    updateBasicInfo: builder.mutation({
      query: (payload: IUpdateBasicInfoPayload) => ({
        url: "",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateBasicInfoMutation } = userApi;
