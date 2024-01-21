"use-client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FreelancerNavbar } from "@/components/freelancer/freelancer-navbar";
import { MapPin, Star } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useBalance } from "wagmi";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";

const Wallet = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [maticBalance, setMaticBalance] = useState<number>(0);
  const [ghoPolygonBalance, setGhoPolygonBalance] = useState<number>(0);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getUser",
    args: [address],
    chainId: 80001,
  });

  const ghoBalanceOnPolygon = useBalance({
    address: address,
    token: "0xC6e0ED62C7e6042fDc64354273F3d51f7FAE458e",
    chainId: 80001,
  });

  const balance = useBalance({
    address: address,
    chainId: 80001,
  });

  // const ethBalance = useBalance({
  //   address: address,
  //   chainId: 11155111,
  // });

  useEffect(() => {
    if (!address) {
      router.push("/");
    } else {
      setMaticBalance((balance as any).data.formatted);
      setGhoPolygonBalance((ghoBalanceOnPolygon as any).data.formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <>
      <div className="px-8 py-4">
        <FreelancerNavbar />
      </div>
      <div className="flex flex-col gap-10 p-12">
        <div className="flex justify-center items-center">
          <div className="flex justify-center font-semibold text-6xl">
            Hello , {data ? (data as any).name : ""}
          </div>
        </div>
        <div className="flex justify-center">
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

        <div className="grid grid-cols-2 gap-20">
          <Card className=" bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>Balance</CardTitle>
              <div className="border border-solid border-green-800 dark:border-purple-800 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8 items-left">
              GHO Balance : {Number(ghoPolygonBalance).toFixed(3)} GHO
              <div>MATIC Balance : {Number(maticBalance).toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className=" bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15">
            <CardHeader className="flex justify-center items-center">
              <CardTitle> Pending Payments</CardTitle>
              <div className="border border-solid border-green-800 dark:border-purple-800 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-8 items-left">
              <div>GHO Balance : {"0 GHO"}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Wallet;
