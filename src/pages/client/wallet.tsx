import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { ClientNavbar } from "@/components/client/client-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Wallet = () => {
  const router = useRouter();
  const { address } = useAccount();

  async function checkUser(address: string) {
    const res = await getUser(address);
    if (res) {
      switch (res.userType) {
        case "client":
          console.log("client wallet connected");
          break;
        default:
          console.log("You are not client wallet. Redirecting to home page");
          router.push("/");
          break;
      }
    }
  }

  useEffect(() => {
    if (!address) {
      router.push("/");
    } else {
      checkUser(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <>
      <div className="px-8 py-4">
        <ClientNavbar />
      </div>
      <div className="flex flex-col gap-20 p-12">
        <p className="flex justify-center font-semibold text-6xl">Hello , X</p>
        <div className="grid grid-cols-3 gap-20">
          <Card className=" bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Balances</CardTitle>
              <div className="border border-solid border-purple-800 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8 items-center">
              <div>GHO</div>
              <div>ETH</div>
              <div>USDT</div>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Exchange</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 justify-center items-center">
              <p>Description</p>
              <Input
                placeholder="Enter the amount to send"
                className="max-w-sm w-96  border-green-900 dark:bg-purple-100 dark:text-purple-900"
              />
              <Button>Send</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Wallet;
