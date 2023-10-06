import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreatePlayPayload, IGetPlayPayload, IPlay } from '../utils/types';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const playApi = createApi({
  reducerPath: 'playApi',
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/play`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createPlay: builder.mutation<IPlay, ICreatePlayPayload>({
      query: (payload: ICreatePlayPayload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),

    getPlay: builder.query<IPlay, IGetPlayPayload>({
      query: (payload: IGetPlayPayload) => ({
        url: `/?playId=${payload.playId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreatePlayMutation, useGetPlayQuery } = playApi;
