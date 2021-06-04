import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Dinghy!</span>
        </h1>

        <p className="mt-3 text-2xl">
          A minimal container management engine, inspired by{" "}
          <a href="https://yacht.sh" target="_blank" rel="noreferrer">
            Yacht
          </a>
          .
        </p>
      </main>
    </Layout>
  );
};

export default Home;
