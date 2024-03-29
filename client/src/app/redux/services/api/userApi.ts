import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseUserInfoTypes, ReturnUserInfoTypes } from 'src/common/models';

const PORT = process.env.PORT || 9000;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${PORT}`,
  }),
  tagTypes: ['User'],
  endpoints: build => ({
    fetchUser: build.query<ReturnUserInfoTypes, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
      transformResponse: ({ id, display_name: displayName }: ResponseUserInfoTypes) => {
        const userInfo = {
          userId: id,
          userName: displayName,
        };
        return userInfo;
      },
    }),
  }),
});

export const { useFetchUserQuery } = userApi;
