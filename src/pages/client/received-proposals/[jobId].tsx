import React from "react";
import { useRouter } from "next/router";
import { ClientNavbar } from "@/components/client/client-navbar";

const JobId = () => {
  const router = useRouter();
  const jobId = router.query.jobId;
  let displayName = "";

  switch (jobId) {
    case "1":
      displayName = "Build a website";
      break;
    case "2":
      displayName = "Build a mobile app";
      break;
    case "3":
      displayName = "Build a smart contract";
      break;

    default:
      displayName = "";
  }

  return (
    <div className="px-8 py-4">
      <ClientNavbar />
      {displayName}
    </div>
  );
};

export default JobId;
