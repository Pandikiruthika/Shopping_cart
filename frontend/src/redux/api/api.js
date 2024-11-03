import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Configure the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), tagTypes: [
    "VerifyOtp","Login","Products","GetProducts","GetReview","GetUser","UpdateUser","AddCart","Order","review"
    
  ],
  endpoints: () => ({}),
});
