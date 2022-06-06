import Image from 'next/image';
import type { FC } from 'react';

const Footer: FC = (): JSX.Element => (
  <footer className="flex h-16 w-full items-center justify-center border-t mt-8">
    <a
      className="font-bold hover:text-violet-800 text-violet-600 flex items-center justify-center gap-2 pt-2"
      href="https://github.com/alonso-cadenas/image-search-ui"
      target="_blank"
      rel="noopener noreferrer"
    >
      Made by Alonso Cadenas
      <Image src="/github.png" alt="GitHub Logo" width={24} height={24} />
    </a>
  </footer>
);

export default Footer;
