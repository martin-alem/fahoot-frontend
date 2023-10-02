import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const logApi = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/log`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    log: builder.mutation({
      query: (payload: { [key: string]: string }) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLogMutation } = logApi;
