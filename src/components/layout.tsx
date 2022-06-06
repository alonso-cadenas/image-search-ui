import type { FC, ReactNode } from 'react';
import Head from 'next/head';
import Footer from './footer';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }: Props): JSX.Element => (
  <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <Head>
      <title>Image Search</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <meta name="description" content="Search and view images from Imgur." />
    </Head>

    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      {children}
    </main>

    <Footer />
  </div>
);

export default Layout;
