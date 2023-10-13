import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreatePlayerPayload, IPlayer } from '../utils/types';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const playerApi = createApi({
  reducerPath: 'playerApi',
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/player`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createPlayer: builder.mutation<IPlayer, ICreatePlayerPayload>({
      query: (payload: ICreatePlayerPayload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
    }),

    getPlayers: builder.query<IPlayer[], void>({
      query: () => ({
        url: `/list`,
        method: 'GET',
      }),
    }),

    getPlayer: builder.query<IPlayer, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreatePlayerMutation, useGetPlayersQuery, useGetPlayerQuery } = playerApi;
