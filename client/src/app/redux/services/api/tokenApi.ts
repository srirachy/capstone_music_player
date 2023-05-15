import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReturnTokenTypes, TokenProps } from 'src/common/models';
import { createTokenObj } from 'src/utils/Functions';

const PORT = process.env.PORT || 9000;

export const tokenApi = createApi({
  reducerPath: 'tokenApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${PORT}`,
  }),
  tagTypes: ['Token'],
  endpoints: build => ({
    fetchToken: build.query<ReturnTokenTypes, void>({
      query: () => '/auth/token',
      providesTags: ['Token'],
      transformResponse: (response: TokenProps) => {
        const newTokenObj = createTokenObj(response);
        const tokenExist = newTokenObj.token !== '';
        return { newTokenObj, tokenExist };
      },
    }),
    fetchRefreshToken: build.mutation<ReturnTokenTypes, string>({
      query: (refreshToken: string) => ({
        url: `/auth/refresh_token/${refreshToken}`,
        method: 'GET',
      }),
      invalidatesTags: ['Token'],
      transformResponse: (response: TokenProps) => {
        const newTokenObj = createTokenObj(response);
        const tokenExist = newTokenObj.token !== '';
        return { newTokenObj, tokenExist };
      },
    }),
    fetchLogout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      invalidatesTags: ['Token'],
    }),
  }),
});

export const { useFetchTokenQuery, useFetchRefreshTokenMutation, useFetchLogoutMutation } = tokenApi;
