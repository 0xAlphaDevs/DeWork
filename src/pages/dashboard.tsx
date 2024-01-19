import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { Navbar } from "@/components/app/navbar";
import { FreelancerNavbar } from "@/components/freelancer/freelancer-navbar";
import { JobCard } from "@/components/freelancer/job-card";
import { Job } from "@/lib/types";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";

const Dashboard = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [jobs, setJobs] = useState<Job[]>([]);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0xeDe54e20dD081FE70cAE3fa46689E12d175117be",
    functionName: "getAllActiveJobs",
  });

  useEffect(() => {
    if (data) {
      setJobs(data as Job[]);
    }
  }, [data]);

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]); // TO DO

  async function checkUser(address: string) {
    const res = await getUser(address);
    if (res) {
      switch (res.userType) {
        case "freelancer":
          console.log("freelancer wallet connected");
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
        <FreelancerNavbar />
      </div>
      <div className="flex flex-col px-8 py-4">
        <div className="text-4xl px-8 py-8 font-semibold ">All Active Jobs</div>
        {jobs.map((job: Job) => (
          <>
            <JobCard key={job.jobId} job={job} />
          </>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
