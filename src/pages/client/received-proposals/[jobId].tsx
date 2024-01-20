import React from "react";
import { useRouter } from "next/router";
import { ClientNavbar } from "@/components/client/client-navbar";
import { RecievedProposalsTable } from "@/components/client/received-proposals-table";

const JobId = () => {
  const router = useRouter();
  const jobId = router.query.jobId;
  let displayName = "";

  switch (jobId) {
    case "1":
      displayName = "Job 1";
      break;
    case "2":
      displayName = "Job 2";
      break;
    case "3":
      displayName = "Job 3";
      break;

    default:
      displayName = "";
  }

  return (
    <div className="px-8 py-4">
      <ClientNavbar />
      <div className="py-12">
        <p className="px-12 font-semibold text-3xl">
          Job Id:{" "}
          <span className="bg-green-900 px-2 rounded-lg dark:bg-purple-400">
            {" "}
            {displayName}
          </span>
        </p>
        <RecievedProposalsTable />
      </div>
    </div>
  );
};

export default JobId;
