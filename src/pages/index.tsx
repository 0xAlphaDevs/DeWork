import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ConnectKitButton />
      <Button>Click me</Button>
    </>
  );
}
