import type { FC, ChangeEventHandler } from 'react';

type Props = {
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
  searchTerm: string;
};

const SearchInput: FC<Props> = ({
  handleOnChange,
  searchTerm,
}: Props): JSX.Element => (
  <input
    aria-label="search-images"
    autoComplete="off"
    className="block bg-white w-full border border-slate-300 rounded-md py-2 shadow-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-violet-500 focus:ring-1 text-center"
    id="search-images-input"
    onChange={handleOnChange}
    placeholder="Search for images in Imgur"
    type="text"
    value={searchTerm}
  />
);

export default SearchInput;
