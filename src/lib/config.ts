import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { polygonMumbai, sepolia } from "wagmi/chains";

export const config = createConfig(
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
