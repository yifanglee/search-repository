import React, { useState, useContext } from 'react';
import { SearchContext } from '../Contexts/SearchContext';
import { DebounceInput } from 'react-debounce-input';

const SearchInput = (Props) => {
  const { searchReop, errorMsg } = useContext(SearchContext);
  const [keyword, setKeyword] = useState('');
  const inputHandle = async (value) => {
    setKeyword(keyword);
    await searchReop(value);
  };
  return (
    <>
      <div className="relative">
        <DebounceInput
          className="search-input px-2 w-full"
          value={keyword}
          debounceTimeout={300}
          onChange={(e) => {
            inputHandle(e.target.value);
          }}
          placeholder="Search..."
        />
        <i className="search-icon fas fa-search baltic-sea absolute"></i>
      </div>
      {errorMsg !== '' && <p>{errorMsg}</p>}
    </>
  );
};

export default SearchInput;
