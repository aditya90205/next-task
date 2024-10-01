"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { fetchProducts, setCurrentPage } from "../slices/productSlice";

export default function ProductList() {
  const {
    products,
    selectedCategory,
    currentPage,
    searchQuery,
    isLoading,
    hasMore,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Fetch products when page, category, or search query changes
  useEffect(() => {
    if (!isLoading && hasMore) {
      dispatch(
        fetchProducts({
          category: selectedCategory,
          page: currentPage,
          searchQuery,
        })
      );
    }
  }, [currentPage, selectedCategory, searchQuery]);

  // Handle scrolling logic
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollHeight = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;

    // If the user has scrolled to the bottom
    if (scrollHeight >= documentHeight - 10) {
      dispatch(setCurrentPage(currentPage + 1)); // Fetch next page
    }
  }, [currentPage, isLoading, hasMore]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="w-3/4 p-4">
      <h2 className="text-lg font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <h3 className="font-bold text-md mb-2">{product.title}</h3>
            <p>{product.description}</p>
            <p className="mt-2 text-lg font-semibold">${product.price}</p>
          </div>
        ))}
      </div>

      {isLoading && <div className="text-center mt-4">Loading...</div>}

      {!hasMore && (
        <div className="text-center mt-4">No more products available.</div>
      )}
    </div>
  );
}
