import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  categories: [],
  selectedCategory: "all",
  searchQuery: "",
  currentPage: 1,
  isLoading: false,
  hasMore: true,
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    return res.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, page, searchQuery }) => {
    let url = "";

    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=10&skip=${
        (page - 1) * 10
      }`;
    } else if (category && category !== "all") {
      url = `https://dummyjson.com/products/category/${
        category.slug
      }?limit=10&skip=${(page - 1) * 10}`;
    } else {
      url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
    }

    const res = await axios.get(url);
    return { products: res.data.products, total: res.data.total };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      state.products = [];
      state.hasMore = true;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.products = [];
      state.hasMore = true;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, total } = action.payload;

        state.isLoading = false;

        if (state.currentPage === 1) {
          state.products = products;
        } else {
          state.products = [...state.products, ...products];
        }

        if (state.products.length >= total) {
          state.hasMore = false;
        }
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCategory, setSearchQuery, setCurrentPage } =
  productSlice.actions;
export default productSlice.reducer;
