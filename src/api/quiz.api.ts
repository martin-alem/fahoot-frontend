import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateQuizPayload, IGetQuizzesPayload } from '../utils/types';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const quizApi = createApi({
  reducerPath: 'quizApi',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/quiz`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (payload: IGetQuizzesPayload) => ({
        url: `?page=${payload.page}&pageSize=${payload.pageSize}&sortField=${payload.sortField}&sortOrder=${payload.sortOrder}&query=${payload.query}`,
        method: 'GET',
      }),
    }),

    createQuiz: builder.mutation({
      query: (payload: ICreateQuizPayload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useGetQuizzesQuery, useCreateQuizMutation } = quizApi;
