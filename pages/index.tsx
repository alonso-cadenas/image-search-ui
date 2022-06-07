import type { NextPage } from 'next';
import Layout from '../src/components/layout';
import Search from '../src/components/search';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-violet-600">Image Search</span>!
      </h1>

      <Search />
    </Layout>
  );
};

export default Home;
