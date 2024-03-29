# DeWork

A Decentralized freelancing platform connecting businesses and professionals | Built during LFGHO

## Table of Contents

1. [All Links](#links)
2. [Instructions to setup and run locally ](#instructions-to-setup)
3. [Tech Stack](#tech-stack)
4. [Deployed Contracts](#deployed-contracts)
5. [Our Solution (Architecture)](#our-solution-architecture)
6. [Team](#team)

## Links

- [Deployed URL](https://dework-khaki.vercel.app/)
- [Git Repo with README](https://dework-khaki.vercel.app/)

## Instructions to Setup

Follow these instructions to set up and run the project:

**Using Github**

- Clone the Git repository: `https://github.com/0xAlphaDevs/DeWork.git`
- Install project dependencies: `pnpm install`
- Start the development server: `pnpm run dev`
- Access the web app in your browser at [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next JS
- Typescript
- Tailwind CSS
- Radix UI
- Tanstack
- Connectkit
- Lucide React
- wagmi
- @wagmi/core

## Deployed Contracts on Polygon Mumabi

- DeWork Contract : 0x1FD044132dDf03dF133bC6dB12Bd7C4093857523
- GHO : 0xC6e0ED62C7e6042fDc64354273F3d51f7FAE458e

## Our Solution (Architecture)

### Client

- Client can create jobs which will be displayed on the client's dashboard.
- Client can view the recieved proposals and accept them.
- Ongoing jobs will be displayed in a table where client can search the jobs by job ID and approve the work after satisfaction.
- If a client is approving a job , the bid amount (GHO) will be listed from wallet.

### Freenlancer

- Freelancer can view all active jobs and apply to them via a form.
- All sent proposals will be be displayed in a table under the "Sent Proposals" tab.
- If the proposal is accepted, it will be shown under the ongoing job table from where freelancer have a submit button to submit their work.

## Team

Team [AlphaDevs](https://alphadevs.dev) 👇

### Github

[Harsh Tyagi](https://github.com/mr-harshtyagi)
[Yashasvi Chaudhary](https://github.com/0xyshv)

### Twitter / X

[Harsh Tyagi](https://twitter.com/mr_harshtyagi)
[Yashasvi Chaudhary](https://twitter.com/0xyshv)

## Thanks

- Feel free to reach out to the [AlphaDevs team](https://alphadevs.dev) with any questions or issues.

- We appreciate your interest in our project and welcome contributions and feature suggestions.
