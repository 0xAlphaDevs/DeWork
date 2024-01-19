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

type CardProps = React.ComponentProps<typeof Card>;

export function JobCard({ className, ...props }: CardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllActiveJobs();
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
          className={cn("shadow-lg dark:bg-dialogColor ", className)}
          {...props}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {job.title}
              <p className="px-2 py-1 text-white text-sm font-bold rounded-md bg-green-800 dark:text-black dark:bg-white">
                {job.jobId}
              </p>
            </CardTitle>
            <CardDescription>
              <p>{job.description}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex gap-4">
              {job.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="text-sm bg-green-900 dark:bg-purple-50 "
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between shadow-lg dark:shadow-xl font-semibold p-2 rounded-lg border border-green-100 dark:border-purple-700/35">
              <p>Offer: {job.budget}</p>
              <p>Current Proposals: {job.proposals}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{job.createdAt}</p>
            <Button>Close Job</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
