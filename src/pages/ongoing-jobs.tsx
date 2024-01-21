import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { FreelancerNavbar } from "@/components/freelancer/freelancer-navbar";
import { OngoinJobtable } from "@/components/freelancer/ongoing-job-table";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";
import { Proposal } from "@/lib/types";

// TO DO - same as sent proposals component
const OngoingJobs = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [ongoingProposals, setOngoingProposals] = useState<Proposal[]>([]);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0xeDe54e20dD081FE70cAE3fa46689E12d175117be",
    functionName: "getAllProposalsByCreator",
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
        <FreelancerNavbar />
      </div>
      <div className="flex justify-center items-center">
        <OngoinJobtable />
      </div>
    </>
  );
};

export default OngoingJobs;
