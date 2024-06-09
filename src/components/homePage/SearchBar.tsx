import React from 'react';
import { movieStore } from '../../mobx/movieStore';
import { observer } from 'mobx-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      movieStore.setCurrentPage(1);
      onSearch(movieStore.searchQuery);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    movieStore.setSearchQuery(value);
    if (value.length === 0) {
      movieStore.setCurrentPage(1);
      onSearch("");
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={movieStore.searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a movie..."
        className="w-full p-4 border border-gray-300 rounded text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
      />
    </div>
  );
};

export default observer(SearchBar);
