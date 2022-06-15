import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ImgurGallery } from '../models/imgur-gallery';
import { ImgurTag } from '../models/imgur-tag';
import { getImages } from '../utils/get-images';
import { sanitize } from '../utils/sanitize';
import ClearButton from './clear-button';
import SearchIcon from './search-icon';
import SearchInput from './search-input';

const SearchResults = dynamic(() => import('./search-results'));

const debounceTimeout = 250;

export const Search = (): JSX.Element => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState<Array<ImgurGallery>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(async () => {
      let data: Array<ImgurGallery> = [];
      if (searchTerm.length > 0) {
        data = await getImages(searchTerm);
      }
      setResults(data);
      setIsSearching(false);
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setIsSearching, setResults]);

  const renderTags = () => {
    const frequencyMap = new Map();
    results.forEach((gallery: ImgurGallery) =>
      gallery.tags?.forEach((tag: ImgurTag) => {
        if (!frequencyMap.has(tag?.display_name)) {
          frequencyMap.set(tag?.display_name, 1);
        } else {
          const frequency = frequencyMap.get(tag?.display_name);
          frequencyMap.set(tag?.display_name, frequency + 1);
        }
      })
    );
    const sortedArray = Array.from(frequencyMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    return (
      !!results.length && (
        <section className="mb-2" id="filter-by-tag">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">
            Filter Results By Tag
          </h2>
          <ul>
            {sortedArray.map((tagFrequency, i) => (
              <li
                className="hover:cursor-pointer hover:text-violet-800 hover:font-bold"
                key={i}
                onClick={() => {
                  const newResults: Array<ImgurGallery> = results.reduce(
                    (acc: Array<ImgurGallery>, gallery: ImgurGallery) => {
                      const newTags = gallery?.tags?.filter(
                        ({ display_name }) => display_name === tagFrequency[0]
                      );

                      if (newTags.length) {
                        const newGallery = { ...gallery, tags: newTags };
                        acc.push(newGallery);
                      }

                      return acc;
                    },
                    []
                  );
                  setResults(newResults);
                }}
              >
                {tagFrequency[0]}: {tagFrequency[1]}
              </li>
            ))}
          </ul>
        </section>
      )
    );
  };

  return (
    <>
      <section className="w-full sm:max-w-2xl my-6 text-xl" id="search-images">
        <label className="relative block" htmlFor="search-images-input">
          <SearchIcon />
          <span className="sr-only">Search</span>
          <SearchInput
            handleOnChange={(e) => {
              const value = sanitize(e?.target?.value);
              if (value !== searchTerm) {
                setIsSearching(true);
                setSearchTerm(value);
              }
            }}
            searchTerm={searchTerm}
          />
          {!!searchTerm.length && (
            <ClearButton
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
      {renderTags()}
      <SearchResults
        isSearching={isSearching}
        results={results}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default Search;
