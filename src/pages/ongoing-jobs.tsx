import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import getUser from "@/lib/hooks/getUser";
import { FreelancerNavbar } from "@/components/freelancer/freelancer-navbar";
import { OngoinJobtable } from "@/components/freelancer/ongoing-job-table";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";
import { Proposal } from "@/lib/types";

const OngoingJobs = () => {
  const { address } = useAccount();
  const [ongoingProposals, setOngoingProposals] = useState<Proposal[]>([]);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0x16e89169832FF505c77F4EB353e084bD5532E179",
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
        <OngoinJobtable ongoingProposals={ongoingProposals} />
      </div>
    </>
  );
};

export default OngoingJobs;
