// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IDeWork {
    struct User {
        string name;
        string location;
        string userType;
        uint256 rating;
        uint256 ghoSpent;
        address walletAddress;
    }

    struct Job {
        uint jobId;
        string title;
        string description;
        string status;
        string[] tags;
        uint256 budget;
        string createdAt;
        address createdBy;
    }

    struct Proposal {
        uint proposalId;
        uint jobId;
        string status;
        uint bid;
        string description;
        string createdAt;
        address createdBy;
    }

    event JobCreated(uint jobId, address createdBy);
    event ProposalCreated(uint proposalId, uint jobId, address createdBy);
    event ProposalAccepted(uint proposalId, uint jobId, address createdBy);
    event JobCompletedByFreelancer(uint jobId, address createdBy);
}
