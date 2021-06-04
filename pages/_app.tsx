import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import "../styles/index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

/** Date Format used with date-fns to keep it consistent across the app */
export const DATE_FORMAT = "MM/dd/yyyy HH:mm";

export default MyApp;
