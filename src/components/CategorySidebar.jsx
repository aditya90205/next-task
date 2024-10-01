"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setCategory,
  setCurrentPage,
} from "../slices/productSlice";

export default function CategorySidebar() {
  const { categories, selectedCategory } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    // If the same category is clicked again, deselect it (toggle)
    if (selectedCategory?.slug === category.slug) {
      dispatch(setCategory(null)); // Deselect category
      dispatch(fetchProducts({ category: null, page: 1 })); // Fetch all products
    } else {
      dispatch(setCategory(category)); // Set new selected category
      dispatch(fetchProducts({ category, page: 1 })); // Fetch filtered products
    }
  };

  return (
    <div className="w-1/4 p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      {categories.map((category) => (
        <div key={category.slug}>
          <input
            type="checkbox"
            id={category.slug}
            checked={selectedCategory?.slug === category.slug}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={category.slug} className="ml-2">
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
}
