import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/api/api';

const initialState = {
  userData: []
};

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOtpData: builder.mutation({
      query: (body) => ({
        url: `verifyotp`,
        method: 'POST',
        body: body,
        responseHandler: (response) => (response.ok ? response.text() : response.text())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['VerifyOtp'] : []),
    }),
    loginOtpData: builder.mutation({
      query: (body) => ({
        url: `login`,
        method: 'POST',
        body: body,
        responseHandler: (response) => (response.ok ? response.json() : response.json())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['Login'] : []),
    }), 
    registerOtpData: builder.mutation({
      query: (body) => ({
        url: `createuser`,
        method: 'POST',
        body: body,
        responseHandler: (response) => (response.ok ? response.text() : response.text())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['CreateUser'] : []),
    }),
    getUserData: builder.query({
      query: (query) => `/getuser/${query}`,
      transformResponse: (responseData) => responseData,
      transformErrorResponse: (err) => ({
        status: err.originalStatus ?? err.status,
        data: err.data,
      }),
      providesTags: ['GetUser'],
    }),
    UpdateUserData: builder.mutation({
      query: (body) => ({
        url: `/createuser`,  
        method:'PUT',
        body: body,
        responseHandler: (response) => (response.ok ? response.text() : response.text())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['UpdateUser'] : []),
    }),
  }),
});

export const {
  useVerifyOtpDataMutation,
  useLoginOtpDataMutation,
  useRegisterOtpDataMutation,
  useLazyGetUserDataQuery,
  useUpdateUserDataMutation,
} = UserApiSlice;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
export const selectUserliceData = (state) => state.user;
