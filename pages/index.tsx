import Head from "next/head";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Dinghy - Minimal container management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex flex-row items-center justify-center w-full h-16">
        Dinghy
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Dinghy!</span>
        </h1>

        <p className="mt-3 text-2xl">
          A minimal container management engine, inspired by{" "}
          <a
            className="text-blue-500"
            href="https://yacht.sh"
            target="_blank"
            rel="noreferrer"
          >
            Yacht
          </a>
          .
        </p>
      </main>

      <div className="flex items-center justify-center w-full h-16 border-t">
        <p>
          Powered by{" "}
          <a
            className="text-blue-500"
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
          >
            NextJS
          </a>{" "}
          with{" "}
          <a
            className="text-blue-500"
            href="https://typescriptlang.org"
            target="_blank"
            rel="noreferrer"
          >
            Typescript
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Home;
