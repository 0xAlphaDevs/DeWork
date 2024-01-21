import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  BadgeDollarSignIcon,
  BookUser,
  Briefcase,
  Calendar,
} from "lucide-react";
import SendProposalForm from "./send-proposal-form";

export function JobCard({ job }: { job: Job }) {
  // useEffect(() => {}, []);

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
              Job Id : {job.jobId.toString()}
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
              Budget : $ {job.budget.toString()}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BookUser className="h-5" />
            <p className="text-lg font-thin">
              Total Proposals : {job.proposals}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BookUser className="h-5" />
            <p className="text-lg font-thin">
              Creator :{" "}
              <span className="text-blue-600 dark:text-blue-400 font-normal cursor-pointer">
                {job.createdBy}
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Calendar className="h-5" />
            <p className="font-semibold">Posted Date : {job.createdAt}</p>
          </div>
          <div className="flex gap-4">
            <SendProposalForm jobId={job.jobId.toString()} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
