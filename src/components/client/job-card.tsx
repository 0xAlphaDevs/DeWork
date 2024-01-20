import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
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

export function JobCard({ job }: { job: Job }) {
  const router = useRouter();

  const handleViewProposal = (jobId: string) => {
    router.push(`/client/received-proposals/${jobId}`);
  };

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
            <p className="px-2 py-1 text-white text-sm font-bold rounded-md bg-green-800 dark:text-black dark:bg-white">
              Job ID : {job.jobId}
            </p>
          </CardTitle>
          <CardDescription>
            <p>{job.description}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex gap-2 items-center">
            <Briefcase className="h-5" />
            <div className="flex gap-4">
              <p className="text-lg font-thin">Skills Required :</p>
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
            <p className="text-lg font-thin">
              Budget : ${job.budget.toString()}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BookUser className="h-5" />
            <p className="text-lg font-thin">
              Total Recieved Proposals : {job.proposals}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Calendar className="h-5" />
            <p className="font-semibold">Posted Date : {job.createdAt}</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => handleViewProposal(job.jobId)}>
              View Proposal
            </Button>
            <Button>Close Job</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
