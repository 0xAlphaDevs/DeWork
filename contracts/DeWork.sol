// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IDeWork.sol";

contract DeWork is IDeWork {
    IERC20 private ghoToken;

    /// @notice Constructor initializes the contract with the gho token address.
    /// @param _gho The address of the gho stablecoin contract.
    constructor(address _gho) {
        ghoToken = IERC20(_gho);
    }

    mapping(address => User) private users;
    mapping(uint => Job) private jobs; // jobId => Job
    uint[] public jobIds;
    mapping(uint => Proposal[]) private proposals; // jobId => Proposal

    // user functions
    function createUser(
        string memory name,
        string memory location,
        string memory userType
    ) public {
        require(
            keccak256(abi.encodePacked(users[msg.sender].walletAddress)) ==
                keccak256(abi.encodePacked(address(0))),
            "User already exists"
        );
        users[msg.sender] = User(name, location, userType, 0, 0, msg.sender);
    }

    // rate a user
    function rateUser(address userAddress, uint256 rating) public {
        require(
            keccak256(abi.encodePacked(users[userAddress].name)) !=
                keccak256(abi.encodePacked("")),
            "User does not exist"
        );
        users[userAddress].rating = rating;
    }

    function getUser(address userAddress) public view returns (User memory) {
        require(
            keccak256(abi.encodePacked(users[userAddress].name)) !=
                keccak256(abi.encodePacked("")),
            "User does not exist"
        );
        User memory user = users[userAddress];
        return user;
    }

    // job functions
    function createJob(
        string memory title,
        string memory description,
        string memory createdAt,
        string[] memory tags,
        uint256 budget
    ) public {
        uint jobId = jobIds.length;
        jobs[jobId] = Job(
            jobId,
            title,
            description,
            "active",
            tags,
            budget,
            createdAt,
            msg.sender
        );
        jobIds.push(jobId);
        emit JobCreated(jobId, msg.sender);
    }

    function startJob(uint jobId) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].status)) ==
                keccak256(abi.encodePacked("active")),
            "Job does not exist"
        );
        require(
            jobs[jobId].createdBy == msg.sender,
            "You are not the creator of this job"
        );
        jobs[jobId].status = "ongoing";
    }

    function closeJob(uint jobId) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].status)) ==
                keccak256(abi.encodePacked("ongoing")),
            "Job does not exist"
        );
        require(
            jobs[jobId].createdBy == msg.sender,
            "You are not the creator of this job"
        );
        jobs[jobId].status = "closed";
    }

    function markJobCompleted(uint jobId, uint proposalId) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].jobId)) ==
                keccak256(abi.encodePacked(jobId)),
            "Job does not exist"
        );
        require(
            proposals[jobId][proposalId].createdBy == msg.sender,
            "You are not creator of this proposal"
        );
        jobs[jobId].status = "completedbyfreelancer";
        emit JobCompletedByFreelancer(jobId, msg.sender);
    }

    function approveJobCompletion(uint jobId, uint proposalId) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].status)) ==
                keccak256(abi.encodePacked("completedbyfreelancer")),
            "Job does not exist"
        );
        require(
            jobs[jobId].createdBy == msg.sender,
            "You are not the creator of this job"
        );
        jobs[jobId].status = "completedbyclient";

        // release the 99% of bid amount of GHO from this contract to the freelancer
        uint256 bid = proposals[jobId][proposalId].bid;
        uint256 amount = (bid * 99) / 100;
        ghoToken.transfer(proposals[jobId][proposalId].createdBy, amount);
    }

    function getAllActiveJobs() public view returns (Job[] memory) {
        Job[] memory jobsArray = new Job[](jobIds.length);
        uint256 index = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            if (
                keccak256(abi.encodePacked(jobs[jobIds[i]].status)) ==
                keccak256(abi.encodePacked("active"))
            ) {
                jobsArray[index] = jobs[jobIds[i]];
                index++;
            }
        }
        return jobsArray;
    }

    function getAllJobsByCreator(
        address walletAddress
    ) public view returns (Job[] memory) {
        // count all jobs created by the user
        uint256 count = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            if (
                keccak256(abi.encodePacked(jobs[jobIds[i]].createdBy)) ==
                keccak256(abi.encodePacked(walletAddress))
            ) {
                count++;
            }
        }

        Job[] memory jobsArray = new Job[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            if (
                keccak256(abi.encodePacked(jobs[jobIds[i]].createdBy)) ==
                keccak256(abi.encodePacked(walletAddress))
            ) {
                jobsArray[index] = jobs[jobIds[i]];
                index++;
            }
        }
        return jobsArray;
    }

    // proposal functions
    function createProposal(
        uint jobId,
        string memory createdAt,
        uint bid,
        string memory description
    ) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].jobId)) ==
                keccak256(abi.encodePacked(jobId)),
            "Job does not exist"
        );
        uint proposalId = proposals[jobId].length;
        proposals[jobId].push(
            Proposal(
                proposalId,
                jobId,
                "pending",
                bid,
                description,
                createdAt,
                msg.sender
            )
        );
        emit ProposalCreated(proposalId, jobId, msg.sender);
    }

    function acceptProposal(uint proposalId, uint jobId) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].jobId)) ==
                keccak256(abi.encodePacked(jobId)),
            "Job does not exist"
        );
        require(
            keccak256(abi.encodePacked(proposals[jobId][proposalId].status)) ==
                keccak256(abi.encodePacked("pending")),
            "Proposal does not exist"
        );
        require(
            jobs[jobId].createdBy == msg.sender,
            "You are not the creator of this job"
        );

        proposals[jobId][proposalId].status = "accepted";
        startJob(jobId);

        // approve and transfer bid amount of GHO to this contract
        ghoToken.approve(address(this), proposals[jobId][proposalId].bid);
        ghoToken.transferFrom(
            msg.sender,
            address(this),
            proposals[jobId][proposalId].bid
        );
        emit ProposalAccepted(proposalId, jobId, msg.sender);
    }

    function rejectProposal(uint proposalId, uint jobId) public {
        require(
            keccak256(abi.encodePacked(jobs[jobId].jobId)) ==
                keccak256(abi.encodePacked(jobId)),
            "Job does not exist"
        );
        require(
            keccak256(abi.encodePacked(proposals[jobId][proposalId].status)) ==
                keccak256(abi.encodePacked("pending")),
            "Proposal does not exist"
        );
        require(
            jobs[jobId].createdBy == msg.sender,
            "You are not the creator of this job"
        );

        proposals[jobId][proposalId].status = "rejected";
        emit ProposalAccepted(proposalId, jobId, msg.sender);
    }

    function getAllActiveProposals(
        uint jobId
    ) public view returns (Proposal[] memory) {
        require(
            keccak256(abi.encodePacked(jobs[jobId].jobId)) ==
                keccak256(abi.encodePacked(jobId)),
            "Job does not exist"
        );
        Proposal[] memory proposalsArray = new Proposal[](
            proposals[jobId].length
        );
        uint256 index = 0;
        for (uint256 i = 0; i < proposals[jobId].length; i++) {
            if (
                keccak256(abi.encodePacked(proposals[jobId][i].status)) ==
                keccak256(abi.encodePacked("pending"))
            ) {
                proposalsArray[index] = proposals[jobId][i];
                index++;
            }
        }
        return proposalsArray;
    }

    function getAllProposalsByCreator(
        address walletAddress
    ) public view returns (Proposal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            for (uint256 j = 0; j < proposals[jobIds[i]].length; j++) {
                if (proposals[jobIds[i]][j].createdBy == walletAddress) {
                    count++;
                }
            }
        }

        Proposal[] memory proposalsArray = new Proposal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            for (uint256 j = 0; j < proposals[i].length; j++) {
                if (proposals[jobIds[i]][j].createdBy == (walletAddress)) {
                    proposalsArray[index] = proposals[jobIds[i]][j];
                    index++;
                }
            }
        }
        return proposalsArray;
    }

    function getAllOngoingProposalsForFreelancer(
        address walletAddress
    ) public view returns (Proposal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            for (uint256 j = 0; j < proposals[jobIds[i]].length; j++) {
                if (
                    proposals[jobIds[i]][j].createdBy == walletAddress &&
                    keccak256(
                        abi.encodePacked(proposals[jobIds[i]][j].status)
                    ) ==
                    keccak256(abi.encodePacked("accepted"))
                ) {
                    count++;
                }
            }
        }

        Proposal[] memory proposalsArray = new Proposal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            for (uint256 j = 0; j < proposals[i].length; j++) {
                if (
                    proposals[jobIds[i]][j].createdBy == (walletAddress) &&
                    keccak256(
                        abi.encodePacked(proposals[jobIds[i]][j].status)
                    ) ==
                    keccak256(abi.encodePacked("accepted"))
                ) {
                    proposalsArray[index] = proposals[jobIds[i]][j];
                    index++;
                }
            }
        }
        return proposalsArray;
    }

    function getAllOngoingProposalsForClient(
        address walletAddress
    ) public view returns (Proposal[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            if (jobs[jobIds[i]].createdBy == walletAddress) {
                for (uint256 j = 0; j < proposals[jobIds[i]].length; j++) {
                    if (
                        keccak256(
                            abi.encodePacked(proposals[jobIds[i]][j].status)
                        ) == keccak256(abi.encodePacked("accepted"))
                    ) {
                        count++;
                    }
                }
            }
        }

        Proposal[] memory proposalsArray = new Proposal[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < jobIds.length; i++) {
            if (jobs[jobIds[i]].createdBy == walletAddress) {
                for (uint256 j = 0; j < proposals[i].length; j++) {
                    if (
                        keccak256(
                            abi.encodePacked(proposals[jobIds[i]][j].status)
                        ) == keccak256(abi.encodePacked("accepted"))
                    ) {
                        proposalsArray[index] = proposals[jobIds[i]][j];
                        index++;
                    }
                }
            }
        }
        return proposalsArray;
    }
}
