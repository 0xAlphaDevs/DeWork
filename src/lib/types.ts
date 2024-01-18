export type User = {
  name: string;
  location: string;
  userType: string;
  rating: number;
  ghoSpent: number;
};

export type Job = {
  jobId: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  budget: number;
  proposals: number;
  createdAt: string;
};

export type Proposal = {
  proposalId: string;
  jobId: string;
  status: string;
  createdAt: string;
  createdBy: string;
};
