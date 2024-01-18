import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { ThemeProvider } from "@/components/theme-provider";
import { polygonMumbai, sepolia } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
    chains: [sepolia, polygonMumbai],

    // Required
    appName: "DeWork",

    // Optional
    appDescription:
      "A Decentralized freelancing platform connecting businesses and professionals.",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

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
