import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { ImgurGallery } from '../models/imgur-gallery';

const Gallery = dynamic(() => import('./gallery'));

type Props = {
  isSearching: boolean;
  results: Array<ImgurGallery>;
  searchTerm: string;
};

const SearchResults: FC<Props> = ({
  isSearching,
  results,
  searchTerm,
}: Props): JSX.Element => {
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

  return results.map((gallery: ImgurGallery, i: number) => (
    <Gallery gallery={gallery} key={i} />
  )) as any;
};

export default SearchResults;
