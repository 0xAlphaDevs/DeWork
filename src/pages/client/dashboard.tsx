import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { ClientNavbar } from "@/components/client/client-navbar";
import CreateNewJobForm from "@/components/client/create-new-job";
import { JobCard } from "@/components/client/job-card";
import { useContractRead } from "wagmi";
import { Job } from "@/lib/types";
import { deworkContract } from "@/lib/contracts";

const ClientDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { address } = useAccount();
  const router = useRouter();

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0xeDe54e20dD081FE70cAE3fa46689E12d175117be",
    functionName: "getAllJobsByCreator",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      setJobs(data as Job[]);
    }
  }, [data]);

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
    <>
      <div className="px-8 py-4">
        <ClientNavbar />
      </div>
      <div className=" flex flex-col px-8 py-4">
        <CreateNewJobForm />
        {jobs.length > 0 ? (
          jobs.map((job: Job) => (
            <>
              <JobCard key={job.jobId} job={job} />
            </>
          ))
        ) : (
          <div className="text-2xl px-8 py-8 font-semibold text-center">
            No Active Jobs
          </div>
        )}
      </div>
    </>
  );
};

export default ClientDashboard;
