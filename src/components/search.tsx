import React, { useEffect, useState } from 'react';
import { getImages } from '../utils/get-images';
import { sanitize } from '../utils/sanitize';

const debounceTimeout = 250;
const imageTypes = ['image/jpeg', 'image/gif', 'image/png', 'image/webp'];

type Props = {
  setIsSearching: Function;
  setResults: Function;
};

export const Search = ({ setIsSearching, setResults }: Props): JSX.Element => {
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

  return (
    <form className="w-full sm:max-w-2xl my-6 text-xl" id="search-images">
      <label className="relative block" htmlFor="search-images-input">
        <span className="absolute inset-y-0 left-0 flex items-center px-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="sr-only">Search</span>
        <input
          aria-label="search-images"
          autoComplete="off"
          className="block bg-white w-full border border-slate-300 rounded-md py-2 shadow-sm placeholder:italic placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-violet-500 focus:ring-1 text-center"
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
          <button
            aria-label="Clear the query"
            className="absolute inset-y-0 right-0 flex items-center px-2"
            id="search-images-button"
            onClick={(e) => {
              e?.preventDefault();
              if (searchTerm.length) {
                setSearchTerm('');
              }
            }}
            type="reset"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20">
              <path
                d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                stroke="gray"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        )}
      </label>
    </form>
  );
};

export default Search;
