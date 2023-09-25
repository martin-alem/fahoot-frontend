import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/upload`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (payload: FormData) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),

    deleteFile: builder.mutation({
      query: (key: string) => ({
        url: `/?key=${key}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useUploadFileMutation, useDeleteFileMutation } = uploadApi;
