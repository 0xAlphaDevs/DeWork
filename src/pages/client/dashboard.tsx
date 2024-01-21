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
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getAllJobsByCreator",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      setJobs(data as Job[]);
    }
  }, [data]);

  const {} = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getUser",
    args: [address],
    watch: true,
    onSuccess: (data: any) => {
      switch (data[2]) {
        case "client":
          router.push("/client/dashboard");
          break;
        case "freelancer":
          router.push("/dashboard");
          break;
        default:
          router.push("/");
          break;
      }
    },
    onError: (error: any) => {
      console.log(error);
      router.push("/");
    },
  });

  useEffect(() => {
    if (!address) {
      router.push("/");
    } else {
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
