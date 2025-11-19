'use client';

import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/user/create-landlord',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
    }),

    generateOtp: builder.mutation({
      query: (email) => ({
        url: '/auth/generate-otp',
        method: 'POST',
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useRegisterMutation,
  useLoginMutation,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
} = authApi;
