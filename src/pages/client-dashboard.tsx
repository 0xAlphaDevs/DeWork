import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";

const ClientDashboard = () => {
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
    <div className="flex justify-center items-center h-screen text-xl">
      Client Dashboard
    </div>
  );
};

export default ClientDashboard;
