import React, { Fragment } from "react";
import { useRouter } from 'next/router'
import Separator from "./Separator";
import Link from "next/link";
import Head from "next/head";

/**
 * Header 
 * - Displayed on all pages to provide navigation for Dinghy
 */
const Header = () => {
  const links = ["containers", "images", "networks", "volumes"];
  const currentView = useRouter();

  return (
    <>
      <Head>
        <title>Dinghy - Minimal container management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full !h-16 text-center">
        <span className="text-xl">Dinghy</span>
        <p className="text-sm">
          <Link href="/">
            <a
              className={
                currentView.asPath.substring(1) === "" ? "active" : undefined
              }
            >
              home
            </a>
          </Link>
          {links.map((link, idx) => (
            <Fragment key={idx}>
              <Separator />
              <Link href={`/${link}`}>
                <a
                  className={
                    currentView.asPath.substring(1) === link ? "active" : undefined
                  }
                >
                  {link}
                </a>
              </Link>
            </Fragment>
          ))}
        </p>
      </header>
    </>
  );
};

export default Header;
