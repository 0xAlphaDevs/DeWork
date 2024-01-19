import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "@/components/theme-provider";
import { config } from "@/lib/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="rounded">
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
