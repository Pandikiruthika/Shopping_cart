import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiSlice } from '../redux/api/api';
import { instance } from '../Utilis/axiosConfig';

const initialState = {
  productDetailData: [],
  productid:[]
};
export const productDetailApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProductData: builder.query({
        query: (query) =>`/product/${query}`,
        transformResponse: (reponseData) =>reponseData,
        transformErrorResponse: (err) => ({
          status: err.originalStatus ?? err.status,
          data: err.data
        }),
        providesTags: ['Products']
      }),  getProductByIdData: builder.query({
        query: (query) =>`/productdetail/${query}`,
        transformResponse: (reponseData) =>reponseData,
        transformErrorResponse: (err) => ({
          status: err.originalStatus ?? err.status,
          data: err.data
        }),
        providesTags: ['GetProducts']
      }),  getReviewdData: builder.query({
        query: (query) =>`/getreview/${query}`,
        transformResponse: (reponseData) =>reponseData,
        transformErrorResponse: (err) => ({
          status: err.originalStatus ?? err.status,
          data: err.data
        }),
        providesTags: ['GetReview']
      })
      
      
    })
  });
  export const {
    useLazyGetProductDataQuery,
    useLazyGetProductByIdDataQuery,
    useLazyGetReviewdDataQuery
   
  } = productDetailApiSlice;
const productDetailSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductId:(state,{payload})=>{
      state.productid=payload

    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getProductData.rejected).addCase(getProductData.fulfilled, (state, { payload }) => {
  //     let {productid } = payload;
  //     state.productid=productid
      
  //   });
  // }8ij
});
export const { productDetailData,setProductId } = productDetailSlice.actions;
export const selectProductData = (state) => state.product;
export default productDetailSlice.reducer;
