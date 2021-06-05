import Head from "next/head";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Footer from "./Footer";
import Header from "./Header";

/**
 * Layout
 * - Wrapper component to apply the Head, Header, and Footer to all pages
 */
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center !h-screen w-full">
      <Head>
        <title>Dinghy - Minimal container management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Scrollbars
        autoHide
      >
      {children}
      </Scrollbars>
      <Footer />
    </div>
  );
};

export default Layout;
