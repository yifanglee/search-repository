import React from 'react';
import { SearchProvider } from '../Contexts/SearchContext';
import SearchInput from '../Components/SearchInput';
import RepoList from '../Components/ReopList';

const App = (Props) => {
  return (
    <div className="container w-auto p-3">
      <SearchProvider>
        <SearchInput />
        <RepoList />
      </SearchProvider>
    </div>
  );
};
export default App;
