import { Proposal } from "../types";

export async function getAllActiveProposals(
  jobId: string
): Promise<Proposal[]> {
  const data: Proposal[] = [
    {
      proposalId: "1",
      jobId: jobId,
      status: "pending",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x123",
    },
    {
      proposalId: "2",
      jobId: jobId,
      status: "accepted",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x456",
    },
    {
      proposalId: "3",
      jobId: jobId,
      status: "rejected",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x789",
    },
  ];

  return data;
}

export async function getProposalByProposalId(
  proposalId: string
): Promise<Proposal> {
  const data: Proposal[] = [
    {
      proposalId: "1",
      jobId: "1",
      status: "pending",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x123",
    },
    {
      proposalId: "2",
      jobId: "1",
      status: "accepted",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x456",
    },
    {
      proposalId: "3",
      jobId: "1",
      status: "rejected",
      createdAt: "2021-09-01T00:00:00.000Z",
      createdBy: "0x789",
    },
  ];

  return data[0];
}
