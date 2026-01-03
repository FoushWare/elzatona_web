import type { AppProps } from "next/app";

import { AdminAuthProvider, ThemeProvider } from "@elzatona/contexts";

import "../src/layouts/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <Component {...pageProps} />
      </AdminAuthProvider>
    </ThemeProvider>
  );
}
