import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthUser, IUpdateBasicInfoPayload } from '../utils/types';

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const userApi = createApi({
  reducerPath: 'userApi',
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/user`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('Authorization', `Bearer ${API_KEY}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUser: builder.query<AuthUser, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),

    updateBasicInfo: builder.mutation<AuthUser, IUpdateBasicInfoPayload>({
      query: (payload: IUpdateBasicInfoPayload) => ({
        url: '',
        method: 'PATCH',
        body: payload,
      }),
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateBasicInfoMutation, useDeleteUserMutation } = userApi;
