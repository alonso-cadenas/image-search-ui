import React, { useEffect, useState } from 'react';
import { getImages } from '../utils/get-images';
import { sanitize } from '../utils/sanitize';
import SearchButton from './search-button';
import SearchIcon from './search-icon';

const debounceTimeout = 250;

export const Search = (): JSX.Element => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchTerm.length > 0) {
        const data = await getImages(searchTerm);
        console.log(data);
        setResults(data);
      } else {
        setResults([]);
      }
      setIsSearching(false);
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setIsSearching, setResults]);

  const renderResults = () => {
    if (isSearching) {
      return <p id="search-gallery-results">Searching...</p>;
    }

    if (searchTerm && !results?.length) {
      return (
        <p id="search-gallery-results">
          No results found - please try a different search query...
        </p>
      );
    }

    // return results.map((parentCategory, i) => (
    //   <CategoriesResultComponent
    //     countryCode={countryCode}
    //     parentCategory={parentCategory}
    //     key={i}
    //   />
    // ));
  };

  return (
    <>
      <section className="w-full sm:max-w-2xl my-6 text-xl" id="search-images">
        <label className="relative block" htmlFor="search-images-input">
          <SearchIcon />
          <span className="sr-only">Search</span>
          <input
            aria-label="search-images"
            autoComplete="off"
            className="block bg-white w-full border border-slate-300 rounded-md py-2 shadow-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-violet-500 focus:ring-1 text-center"
            id="search-images-input"
            onChange={(e) => {
              const value = sanitize(e?.target?.value);
              if (value !== searchTerm) {
                setIsSearching(true);
                setSearchTerm(value);
              }
            }}
            placeholder="Search for images in Imgur"
            type="text"
            value={searchTerm}
          />
          {!!searchTerm.length && (
            <SearchButton
              handleOnClick={(e) => {
                e?.preventDefault();
                if (searchTerm.length) {
                  setSearchTerm('');
                }
              }}
            />
          )}
        </label>
      </section>
      {renderResults()}
    </>
  );
};

export default Search;
