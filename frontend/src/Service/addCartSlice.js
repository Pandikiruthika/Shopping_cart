import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../redux/api/api';

const initialState = {
  addCartData: []
};

export const CartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    cartData: builder.mutation({
      query: (body) => ({
        url: `/addCart`,
        method: 'POST',
        body: body,
        responseHandler: (response) => (response.ok ? response.text() : response.text())
      }),
      invalidatesTags: (result, error) => (result && !error ? ['AddCart'] : []),
    }),
    getcartData: builder.query({
      query: (query) => `/addCart`,
      transformResponse: (responseData) => responseData,
      transformErrorResponse: (err) => ({
        status: err.originalStatus ?? err.status,
        data: err.data,
      }),
      providesTags: ['AddCart'],
    }),
    deletecartData: builder.mutation({
        query: (body) => ({
          url: `/addCart`,
          method: 'Delete',
          body: body,
          responseHandler: (response) => (response.ok ? response.text() : response.text())
        }),
        invalidatesTags: (result, error) => (result && !error ? ['AddCart'] : []),
      })
  
  }),
});

export const {
 useDeletecartDataMutation,
  useCartDataMutation,
  useLazyGetcartDataQuery
} = CartApiSlice;

const cartSlice = createSlice({
  name: 'addcart',
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
// export const selectUserliceData = (state) => state.user;
