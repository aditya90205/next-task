// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../slices/productSlice';
import categorySlice from '../slices/categoriesSlice'; 

export const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
  },
});
