import React, { Fragment } from "react";
import Spacer from "./Spacer";
import Link from "next/link";
import Head from "next/head";

const Header = () => {
  const links = ["containers", "images", "networks", "volumes"];

  return (
    <>
      <Head>
        <title>Dinghy - Minimal container management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full h-16 text-center">
        <span className="text-xl">Dinghy</span>
        <p className="text-sm">
          <Link href="/">
            <a>home</a>
          </Link>
          {links.map((link, idx) => (
            <Fragment key={idx}>
              <Spacer />
              <Link href={`/${link}`}>
                <a>{link}</a>
              </Link>
            </Fragment>
          ))}
        </p>
      </header>
    </>
  );
};

export default Header;
