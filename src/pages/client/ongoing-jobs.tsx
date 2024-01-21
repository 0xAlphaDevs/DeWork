import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { ClientNavbar } from "@/components/client/client-navbar";
import { OngoingJobtable } from "@/components/client/ongoing-job-table";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";
import { Proposal } from "@/lib/types";

// TO DO
const OngoingJobs = () => {
  const router = useRouter();
  const { address } = useAccount();

  const [ongoingProposals, setOngoingProposals] = useState<Proposal[]>([]);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getAllOngoingProposalsForClient",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      // filter data based on status
      const filtered = (data as Proposal[]).filter((proposal: Proposal) => {
        return proposal.status === "accepted";
      });
      console.log(filtered);
      setOngoingProposals(filtered);
    }
  }, [data]);
  return (
    <>
      <div className="px-8 py-4">
        <ClientNavbar />
      </div>
      <div className="flex justify-center items-center ">
        <OngoingJobtable ongoingProposals={ongoingProposals} />
      </div>
    </>
  );
};

export default OngoingJobs;
