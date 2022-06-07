import type { FC, MouseEventHandler } from 'react';

type Props = {
  handleOnClick: MouseEventHandler<HTMLButtonElement>;
};

const SearchButton: FC<Props> = ({ handleOnClick }: Props): JSX.Element => (
  <button
    aria-label="Clear the query"
    className="absolute inset-y-0 right-0 flex items-center px-2"
    id="search-images-button"
    onClick={handleOnClick}
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
);

export default SearchButton;
