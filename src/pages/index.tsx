import React, { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccount } from "wagmi";
import getUser from "@/lib/hooks/getUser";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserMetadata } from "@/components/app/user-metadata";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";

export default function Home() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { address } = useAccount();
  const [isUserRegistered, setIsUserRegistered] = useState(true);
  const [recheckUser, setRecheckUser] = useState<boolean>(false);

  const {} = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getUser",
    args: [address],
    watch: true,
    onSuccess: (data: any) => {
      console.log(data);

      switch (data.userType) {
        case "client":
          router.push("/client/dashboard");
          break;
        case "freelancer":
          router.push("/dashboard");
          break;
        default:
          router.push("/");
          break;
      }
    },
    onError: (error: any) => {
      console.log(error);
      if (address) setIsUserRegistered(false);
    },
  });
  useEffect(() => {
    if (address) {
      console.log("wallet connected", address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div>
      <div className="flex justify-between px-8 pt-4">
        <div className="text-2xl font-bold dark:text-purple-50">DeWork</div>
        <div className="flex gap-5">
          {/* theme icon */}
          <ConnectKitButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-10 items-center px-8 py-20">
        <h1 className="text-6xl font-bold dark:text-purple-50">
          Welcome to DeWork
        </h1>
        <p className="text-3xl dark:text-purple-100 text-center">
          A Decentralized freelancing platform connecting businesses and
          professionals
        </p>
        {isUserRegistered ? (
          <ConnectKitButton />
        ) : (
          <>
            <p>
              You are not registered as a client or Freelancer. Please click
              button below to continue to app.
            </p>
            <UserMetadata setRecheckUser={setRecheckUser} />
          </>
        )}
      </div>
      {/* Features card div */}
      <div className="grid grid-cols-3 gap-8 px-20 pb-8 ">
        <Card className="bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center">Decentralized</CardTitle>
            <CardDescription className="dark:text-white">
              DeWork is a decentralized freelancing platform connecting
              businesses and professionals
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center">GHO Payments</CardTitle>
            <CardDescription className="dark:text-white">
              Payments in DeWork are facilitated by decentralized stablecoin GHO
              which is bridged from ETH Sepolia using CCIP. (Lock and Mint
              model)
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110">
          <CardHeader>
            <CardTitle className="text-center">Secure</CardTitle>
            <CardDescription className="dark:text-white">
              Once a propsal is accepted, GHO is locked in DeWork contract and
              released upon job completion.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="container mx-auto py-8 ">
        <hr className="border-t-2 border-gray-600 dark:border-white mb-4" />
        <div className="flex justify-center items-center">
          <p>&copy; 2024 DeWork. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
