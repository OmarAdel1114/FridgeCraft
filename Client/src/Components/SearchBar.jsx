import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ query, setQuery, handleSearch }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(query);
  };

  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by recipe title or ingredients"
        className="min-w-[600px] py-4 rounded-l-full px-6"
      />
      <button
        onClick={handleSearchClick}
        className="py-4 bg-White text-DarkGreen rounded-r-full text-2xl px-6"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
