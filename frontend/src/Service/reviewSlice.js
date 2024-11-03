import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/api/api';

const initialState = {
  reviewData: []
};

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reviewData: builder.mutation({
      query: (body) => ({
        url: `/review`,
        method: 'POST',
        body: body,
        responseHandler: (response) => (response.ok ? response.text() : response.text())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['review'] : []),
    }),
    getReviewData: builder.query({
      query: (query) => `/getorder`,
      transformResponse: (responseData) => responseData,
      transformErrorResponse: (err) => ({
        status: err.originalStatus ?? err.status,
        data: err.data,
      }),
      providesTags: ['review'],
    }),
   
   
  }),
  
  
});

export const {
useReviewDataMutation,
useLazyGetReviewDataQuery
} = reviewApiSlice;

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
});

export default reviewSlice.reducer;
// export const selectUserliceData = (state) => state.user;
