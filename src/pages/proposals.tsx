import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { FreelancerNavbar } from "@/components/freelancer/freelancer-navbar";
import { SendProposalTable } from "@/components/freelancer/send-proposal-table";
import { deworkContract } from "@/lib/contracts";
import { useContractRead, useContractReads } from "wagmi";
import { Proposal } from "@/lib/types";

const Proposals = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [sentProposals, setSentProposals] = useState<Proposal[]>([]);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0xF64194D00D5e6f0F519bE73B19558f37f300C03E",
    functionName: "getAllProposalsByCreator",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setSentProposals(data as Proposal[]);
    }
  }, [data]);
  return (
    <>
      <div className="px-8 py-4">
        <FreelancerNavbar />
      </div>
      <div className="">
        <SendProposalTable sentProposals={sentProposals} />
      </div>
    </>
  );
};

export default Proposals;
