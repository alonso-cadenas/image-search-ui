import type { NextPage } from 'next';
import Layout from '../src/components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-violet-600">Image Search</span>!
      </h1>

      <p className="mt-3 text-2xl">
        Get started by editing{' '}
        <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
          pages/index.tsx
        </code>
      </p>
    </Layout>
  );
};

export default Home;
