export const deworkContract = {
  address: "0xeDe54e20dD081FE70cAE3fa46689E12d175117be",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "createdBy",
          type: "address",
        },
      ],
      name: "JobCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "createdBy",
          type: "address",
        },
      ],
      name: "ProposalAccepted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "createdBy",
          type: "address",
        },
      ],
      name: "ProposalCreated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "string",
          name: "createdAt",
          type: "string",
        },
        {
          internalType: "string[]",
          name: "tags",
          type: "string[]",
        },
        {
          internalType: "uint256",
          name: "budget",
          type: "uint256",
        },
      ],
      name: "createJob",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "createdAt",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "bid",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
      ],
      name: "createProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "location",
          type: "string",
        },
        {
          internalType: "string",
          name: "userType",
          type: "string",
        },
      ],
      name: "createUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllActiveJobs",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "jobId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "status",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "tags",
              type: "string[]",
            },
            {
              internalType: "uint256",
              name: "budget",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "createdAt",
              type: "string",
            },
            {
              internalType: "address",
              name: "createdBy",
              type: "address",
            },
          ],
          internalType: "struct DeWork.Job[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "getAllActiveProposals",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "proposalId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "jobId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "status",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "bid",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "createdAt",
              type: "string",
            },
            {
              internalType: "address",
              name: "createdBy",
              type: "address",
            },
          ],
          internalType: "struct DeWork.Proposal[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "walletAddress",
          type: "address",
        },
      ],
      name: "getAllJobsByCreator",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "jobId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "status",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "tags",
              type: "string[]",
            },
            {
              internalType: "uint256",
              name: "budget",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "createdAt",
              type: "string",
            },
            {
              internalType: "address",
              name: "createdBy",
              type: "address",
            },
          ],
          internalType: "struct DeWork.Job[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "walletAddress",
          type: "address",
        },
      ],
      name: "getAllProposalsByCreator",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "proposalId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "jobId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "status",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "bid",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "string",
              name: "createdAt",
              type: "string",
            },
            {
              internalType: "address",
              name: "createdBy",
              type: "address",
            },
          ],
          internalType: "struct DeWork.Proposal[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "getJobByJobId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "jobId",
          type: "uint256",
        },
      ],
      name: "getProposalByJobAndProposalId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
      ],
      name: "getUser",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "jobIds",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "rating",
          type: "uint256",
        },
      ],
      name: "rateUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
