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
        setResults(await getImages(searchTerm));
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
    <form className="my-6 text-xl" id="search-images">
      <label htmlFor="search-images-input">Search for images in Imgur</label>
      <input
        aria-label="search-images"
        autoComplete="off"
        className="border rounded px-2"
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
      <button
        aria-label="reset"
        disabled={!searchTerm.length}
        id="search-images-button"
        onClick={(e) => {
          e?.preventDefault();
          if (searchTerm.length) {
            setSearchTerm('');
          }
        }}
      >
        <i />
      </button>
    </form>
  );
};

export default Search;
