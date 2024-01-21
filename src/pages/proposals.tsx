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
    address: "0x16e89169832FF505c77F4EB353e084bD5532E179",
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
