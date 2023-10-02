import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateQuizPayload, IGetQuizzesPayload, IQuiz, IQuizResult, IUpdateQuizPayload } from '../utils/types';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const quizApi = createApi({
  reducerPath: 'quizApi',
  refetchOnMountOrArgChange: true,
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
    getQuizzes: builder.query<IQuizResult, IGetQuizzesPayload>({
      query: (payload: IGetQuizzesPayload) => ({
        url: `?page=${payload.page}&pageSize=${payload.pageSize}&sortField=${payload.sortField}&sortOrder=${payload.sortOrder}&query=${payload.query}`,
        method: 'GET',
      }),
    }),

    getQuiz: builder.query<IQuiz, string>({
      query: (quizId: string) => ({
        url: `/${quizId}`,
        method: 'GET',
      }),
    }),

    createQuiz: builder.mutation<IQuiz, ICreateQuizPayload>({
      query: (payload: ICreateQuizPayload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),

    updateQuiz: builder.mutation<IQuiz, IUpdateQuizPayload>({
      query: (payload: IUpdateQuizPayload) => ({
        url: `/${payload._id}`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const { useGetQuizzesQuery, useCreateQuizMutation, useUpdateQuizMutation, useGetQuizQuery } = quizApi;
