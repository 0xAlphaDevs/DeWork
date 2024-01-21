import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import getUser from "@/lib/hooks/getUser";
import { FreelancerNavbar } from "@/components/freelancer/freelancer-navbar";
import { JobCard } from "@/components/freelancer/job-card";
import { Job } from "@/lib/types";
import { deworkContract } from "@/lib/contracts";
import { useContractRead } from "wagmi";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getAllActiveJobs",
    args: [],
  });

  const {} = useContractRead({
    abi: deworkContract.abi,
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    functionName: "getUser",
    args: [address],
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
    if (data) {
      console.log(data);
      // filter data where job.createdAt is not empty

      const filterData = (data as Job[]).filter((job: Job) => {
        return job.createdAt !== "";
      });
      setJobs(filterData as Job[]);
      setFilteredJobs(filterData as Job[]);
    }
  }, [data]);

  const handleSearchInputChange = (event: any) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm === "") {
      setFilteredJobs(jobs);
      return;
    }

    // Filter credentials based on the search term
    const filtered = jobs.filter((job) => {
      return job.title.toLowerCase().includes(newSearchTerm.toLowerCase());
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <>
      <div className="px-8 py-4">
        <FreelancerNavbar />
      </div>
      <div className="flex flex-col px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-4xl px-8 py-8 font-semibold ">
            All Active Jobs
          </div>
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="max-w-sm w-96 font-semibold border-green-900 dark:bg-purple-100 dark:text-purple-900"
          />
        </div>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job: Job) => <JobCard key={job.jobId} job={job} />)
        ) : (
          <div className="text-2xl px-8 py-8 font-semibold text-center">
            {jobs.length > 0 ? "No Matching Jobs" : "No Active Jobs"}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
