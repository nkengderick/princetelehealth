import './searchbar.css'

import React from 'react';
import {FaSearch} from 'react-icons/fa'

const SearchBar = ({ searchTerm, setSearchTerm, search }) => {


  return (
    <div className='SearchBar'>
        <div className="search-container">
            <input
                type="text"
                placeholder='Search appointment or record by date'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
              <FaSearch className='search-icon'/>
        </div>
    </div>
  );
};

export default SearchBar;
