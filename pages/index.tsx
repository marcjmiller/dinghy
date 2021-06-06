import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <main className='flex flex-col justify-center h-full'>
      <h1 className='text-6xl font-bold text-center'>
        Welcome to <span className='text-blue-600'>Dinghy!</span>
      </h1>

      <p className='mt-3 text-2xl text-center'>
        A minimal container management engine, inspired by{' '}
        <a href='https://yacht.sh' target='_blank' rel='noreferrer'>
          Yacht
        </a>
        .
      </p>
    </main>
  </Layout>
);

export default Home;
