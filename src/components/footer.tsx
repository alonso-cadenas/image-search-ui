import Image from 'next/image';
import type { FC } from 'react';

const Footer: FC = () => (
  <footer className="flex h-24 w-full items-center justify-center border-t">
    <a
      className="flex items-center justify-center gap-2"
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
