"use-client";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { ClientNavbar } from "@/components/client/client-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Star } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useBalance } from "wagmi";
import { deworkContract } from "@/lib/contracts";

const Wallet = () => {
  const router = useRouter();
  const { address } = useAccount();

  const [maticBalance, setMaticBalance] = useState<number>(0);
  const [ethBalance, setEthBalance] = useState<number>(0);
  const [ghoEthBalance, setGhoEthBalance] = useState<number>(0);
  const [ghoPolygonBalance, setGhoPolygonBalance] = useState<number>(0);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getUser",
    args: [address],
    chainId: 80001,
  });

  const ghoBalanceOnEth = useBalance({
    address: address,
    token: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    chainId: 11155111,
  });

  const ghoBalanceOnPolygon = useBalance({
    address: address,
    token: "0xC6e0ED62C7e6042fDc64354273F3d51f7FAE458e",
    chainId: 80001,
  });

  const maticBal = useBalance({
    address: address,
    chainId: 80001,
  });

  const ethBal = useBalance({
    address: address,
    chainId: 11155111,
  });

  useEffect(() => {
    if (!address) {
      router.push("/");
    } else {
      setMaticBalance((maticBal as any).data.formatted);
      setEthBalance((ethBal as any).data.formatted);

      setGhoEthBalance((ghoBalanceOnEth as any).data.formatted);
      setGhoPolygonBalance((ghoBalanceOnPolygon as any).data.formatted);
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
            Hello , {data ? (data as any).name : ""}
          </div>
        </div>
        <div className="flex justify-center gap-8 items-left">
          <div className="flex gap-2 items-center">
            <MapPin />
            <p className="font-thin text-lg">
              {data ? (data as any).location : ""}
            </p>
          </div>

          {/* <div className="flex gap-2 items-center">
            <p className="font-thin text-lg">Rating : </p>
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-yellow-500 h-8 w-8" />
            <StarFilledIcon className="text-gray-300 h-8 w-8" />
          </div> */}
        </div>

        <div className="grid grid-cols-3 gap-20">
          <Card className=" bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Balances</CardTitle>
              <div className="border border-solid border-green-800 dark:border-purple-800 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8 items-left">
              <p className="font-bold text-lg">Sepolia Testnet</p>
              <div>ETH Balance : {Number(ethBalance).toFixed(3)} ETH </div>
              <div>GHO Balance : {Number(ghoEthBalance).toFixed(3)} GHO </div>
              {/* <div>ETH Balance : {"0 ETH"}</div> */}
              <p className="font-bold text-lg">Polygon Mumbai Testnet</p>
              <div>
                MATIC Balance : {Number(maticBalance).toFixed(3)} MATIC{" "}
              </div>
              <div>
                GHO Balance : {Number(ghoPolygonBalance).toFixed(3)} GHO
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15 flex items-center flex-col justify-center gap-10">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Bridge GHO to Polygon Mumbai Testnet</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 justify-center items-center">
              {/* <p>Amount of GHO to bridge</p> */}
              {/* <Input
                type="number"
                placeholder="Enter the amount to send"
                className="max-w-sm w-96  border-green-900 dark:bg-purple-100 dark:text-purple-900"
              /> */}
              <Button className="w-96">Approve CCIP Contract</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Wallet;
