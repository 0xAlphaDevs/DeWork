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
    address: "0xF64194D00D5e6f0F519bE73B19558f37f300C03E",
    functionName: "getAllActiveJobs",
    args: [],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setJobs(data as Job[]);
      setFilteredJobs(data as Job[]);
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
