import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return <div>Freelancer Dashboard</div>;
};

export default Dashboard;
