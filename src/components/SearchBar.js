import React, { useState } from "react";

const SearchBar = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label>Image Search</label>
          <input
            placeholder="type search term"
            type="text"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            value={searchTerm}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;