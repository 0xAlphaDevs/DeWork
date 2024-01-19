import React, { useEffect, useState } from "react";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { getAllActiveJobs } from "@/lib/hooks/getJobs";
import { Job } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  BadgeDollarSignIcon,
  BookUser,
  Briefcase,
  Calendar,
} from "lucide-react";

type CardProps = React.ComponentProps<typeof Card>;

export function JobCard({ className, ...props }: CardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllActiveJobs();
        // instead of  getAllActiveJobs fetch data from getAllJobsByCreator
        setJobs(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 grid gap-8 ">
      {jobs.map((job) => (
        <Card
          key={job.jobId}
          className={cn(
            "bg-opacity-65 shadow-lg dark:bg-purple-300 dark:bg-opacity-15",
            className
          )}
          {...props}
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
              <p className="text-lg font-thin">Budget : ${job.budget}</p>
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
              <Button>View Proposal</Button>
              <Button>Close Job</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
