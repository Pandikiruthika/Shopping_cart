import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/api/api';

const initialState = {
  orderData: []
};

export const OrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orderData: builder.mutation({
      query: (body) => ({
        url: `/order`,
        method: 'POST',
        body: body,
        responseHandler: (response) => (response.ok ? response.text() : response.text())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['Order'] : []),
    }),
    getOrderData: builder.query({
      query: (query) => `/getorder`,
      transformResponse: (responseData) => responseData,
      transformErrorResponse: (err) => ({
        status: err.originalStatus ?? err.status,
        data: err.data,
      }),
      providesTags: ['Order'],
    }),
    deleteOrderData: builder.mutation({
        query: (body) => ({
          url: `/order`,
          method: 'Delete',
          body: body,
          responseHandler: (response) => (response.ok ? response.text() : response.text())
        }),
        invalidatesTags: (result, error) => (result && !error ? ['Order'] : []),
      })
  
  }),
});

export const {
 useDeleteOrderDataMutation,
  useOrderDataMutation,
  useLazyGetOrderDataQuery
} = OrderApiSlice;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export default orderSlice.reducer;
// export const selectUserliceData = (state) => state.user;
