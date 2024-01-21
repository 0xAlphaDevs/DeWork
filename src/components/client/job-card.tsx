import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllJobsByCreator } from "@/lib/hooks/getJobs";
import { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  BadgeDollarSignIcon,
  BookUser,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RecievedProposalsTable } from "./received-proposals-table";
import { useContractRead } from "wagmi";
import { deworkContract } from "@/lib/contracts";
import { Proposal } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  const [receivedProposals, setReceivedProposals] = useState<Proposal[]>([]);
  // fetch all proposals for this job
  const { data } = useContractRead({
    abi: deworkContract.abi,
    address: "0xeDe54e20dD081FE70cAE3fa46689E12d175117be",
    functionName: "getAllActiveProposals",
    args: [job.jobId],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setReceivedProposals(data as Proposal[]);
    }
  }, [data]);

  return (
    <div className="p-8 grid gap-8 ">
      <Card
        key={job.jobId}
        className={cn(
          "bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15"
        )}
      >
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {job.title}
            <div className="px-2 py-1 text-white text-sm font-bold rounded-md bg-green-800 dark:text-black dark:bg-white">
              Job ID : {job.jobId.toString()}
            </div>
          </CardTitle>
          <CardDescription>
            <div>{job.description}</div>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex gap-2 items-center">
            <Briefcase className="h-5" />
            <div className="flex gap-4">
              <div className="text-lg font-thin">Skills Required :</div>
              {job.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="text-sm bg-green-900 dark:bg-purple-500 dark:text-white "
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <BadgeDollarSignIcon className="h-5" />
            <div className="text-lg font-thin">
              Budget : $ {job.budget.toString()}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <BookUser className="h-5" />
            <div className="text-lg font-thin">
              Total Recieved Proposals : {job.proposals}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Calendar className="h-5" />
            <div className="font-semibold">Posted Date : {job.createdAt}</div>
          </div>

          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>View Proposals</Button>
              </DialogTrigger>
              <DialogContent className=" max-w-[90%]">
                <RecievedProposalsTable
                  jobTitle={job.title}
                  receivedProposals={receivedProposals}
                />
              </DialogContent>
            </Dialog>
            <Button>Close Job</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
