import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import userSlice from '../../Service/loginSlice';
import subcategorySlice from '../../Service/subcategorySlice';
import productDetailSlice from '../../Service/productSlice'
import cartSlice from '../../Service/addCartSlice'
import orderSlice from '../../Service/orderSlice'
import reviewSlice from "../../Service/reviewSlice"

export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      user:userSlice,
      subcategory:subcategorySlice,
      product:productDetailSlice,
      addcart :cartSlice,
      order:orderSlice,
      review:reviewSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
    devTools: true
  });
  setupListeners(store.dispatch);
  