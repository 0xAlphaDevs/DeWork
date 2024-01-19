import { Job } from "../types";

export async function getAllActiveJobs(): Promise<Job[]> {
  const data: Job[] = [
    {
      jobId: "1",
      title: "Web Developer",
      description: "Build a website for my business",
      status: "active",
      tags: ["web", "design"],
      budget: 500,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      jobId: "2",
      title: "Android Devloper",
      description: "Build a mobile app for my business",
      status: "active",
      tags: ["mobile", "design"],
      budget: 1000,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      jobId: "3",
      title: "Blockchain developer",
      description: "Build a smart contract for my business",
      status: "active",
      tags: ["smart", "contract"],
      budget: 1500,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
  ];

  return data;
}

// not of much use
export async function getJobByJobId(jobId: string): Promise<Job> {
  const data: Job[] = [
    {
      jobId: "1",
      title: "Build a website",
      description: "Build a website for my business",
      status: "active",
      tags: ["web", "design"],
      budget: 500,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      jobId: "2",
      title: "Build a mobile app",
      description: "Build a mobile app for my business",
      status: "active",
      tags: ["mobile", "design"],
      budget: 1000,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      jobId: "3",
      title: "Build a smart contract",
      description: "Build a smart contract for my business",
      status: "active",
      tags: ["smart", "contract"],
      budget: 1500,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
  ];

  return data[0];
}

export async function getAllJobsByCreator(
  walletAddress: string
): Promise<Job[]> {
  const data: Job[] = [
    {
      jobId: "1",
      title: "Build a website",
      description: "Build a website for my business",
      status: "active",
      tags: ["web", "design"],
      budget: 500,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      jobId: "2",
      title: "Build a mobile app",
      description: "Build a mobile app for my business",
      status: "active",
      tags: ["mobile", "design"],
      budget: 1000,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
    {
      jobId: "3",
      title: "Build a smart contract",
      description: "Build a smart contract for my business",
      status: "active",
      tags: ["smart", "contract"],
      budget: 1500,
      proposals: 3,
      createdAt: "2021-09-01T00:00:00.000Z",
    },
  ];

  return data;
}
