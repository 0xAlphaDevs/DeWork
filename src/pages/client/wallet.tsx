import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { ClientNavbar } from "@/components/client/client-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Star } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

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
      <div className="flex flex-col gap-10 p-12">
        <div className="flex justify-center items-center">
          <div className="flex justify-center font-semibold text-6xl">
            Hello , X
          </div>
        </div>
        <div className="flex justify-center gap-8 items-left">
          <div className="flex gap-2 items-center">
            <MapPin />
            <p className="font-thin text-lg">Delhi, India</p>
          </div>

          <div className="flex gap-2 items-center">
            <p className="font-thin text-lg">Rating : </p>
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-gray-300 h-8 w-8" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-20">
          <Card className=" bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Balances</CardTitle>
              <div className="border border-solid border-green-800 dark:border-purple-800 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8 items-left">
              <p className="font-bold text-lg">Sepolia Testnet</p>
              <div>GHO Balance : {"100 GHO"} </div>
              <div>ETH Balance : {"0 ETH"}</div>
              <p className="font-bold text-lg">Polygon Mumbai Testnet</p>
              <div>GHO Balance : {"0 GHO"}</div>
              <div>MATIC Balance : {"0 ETH"}</div>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15 flex items-center flex-col justify-center gap-10">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Bridge GHO to Polygon Mumbai Testnet</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 justify-center items-center">
              <p>Amount of GHO to bridge</p>
              <Input
                type="number"
                placeholder="Enter the amount to send"
                className="max-w-sm w-96  border-green-900 dark:bg-purple-100 dark:text-purple-900"
              />
              <Button className="w-96">Send</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Wallet;
