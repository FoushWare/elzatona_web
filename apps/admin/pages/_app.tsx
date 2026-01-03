import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AdminAuthProvider, ThemeProvider } from "@elzatona/contexts";

import "../src/layouts/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AdminAuthProvider>
          <Component {...pageProps} />
        </AdminAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
