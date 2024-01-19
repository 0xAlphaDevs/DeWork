import { Proposal } from "../types";

export async function getAllActiveProposals(
  jobId: string
): Promise<Proposal[]> {
  const data: Proposal[] = [
    {
      proposalId: "1",
      jobId: jobId,
      status: "pending",
``      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x123",
    },
    {
      proposalId: "2",
      jobId: jobId,
      status: "accepted",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x456",
    },
    {
      proposalId: "3",
      jobId: jobId,
      status: "rejected",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x789",
    },
  ];

  return data;
}

// not of much use
export async function getProposalByProposalId(
  proposalId: string,
  jobId: string
): Promise<Proposal> {
  const data: Proposal[] = [
    {
      proposalId: "1",
      jobId: "1",
      status: "pending",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x123",
    },
    {
      proposalId: "2",
      jobId: "1",
      status: "accepted",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x456",
    },
    {
      proposalId: "3",
      jobId: "1",
      status: "rejected",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x789",
    },
  ];

  return data[0];
}

export async function getAllProposalsByCreator(
  walletAddress: string
): Promise<Proposal[]> {
  const data: Proposal[] = [
    {
      proposalId: "1",
      jobId: "1",
      status: "pending",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x123",
    },
    {
      proposalId: "2",
      jobId: "1",
      status: "accepted",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x456",
    },
    {
      proposalId: "3",
      jobId: "1",
      status: "rejected",
      bid: 500,
      description: "I will build a website for you",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x789",
    },
  ];

  return data;
}
