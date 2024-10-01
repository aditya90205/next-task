"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CategorySidebar from "../components/CategorySidebar";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { fetchCategories } from "../slices/productSlice";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="flex">
      <CategorySidebar />

      <div className="flex-1 px-7">
        <SearchBar />
        <ProductList />
      </div>
    </div>
  );
}
