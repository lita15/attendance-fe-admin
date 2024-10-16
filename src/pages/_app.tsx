import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}
