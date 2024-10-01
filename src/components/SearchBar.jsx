'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setCurrentPage } from '../slices/productSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.products);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(setCurrentPage(1));  
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search products..."
        className="border p-2 w-full rounded"
      />
    </div>
  );
}
