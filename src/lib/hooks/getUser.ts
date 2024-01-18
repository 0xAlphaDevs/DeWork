import { User } from "../types";

export default async function getUser(walletAddress: string): Promise<User> {
  const data: User[] = [
    {
      name: "John Doe",
      location: "United States",
      userType: "client",
      rating: 4.5,
      ghoSpent: 1000,
    },
    {
      name: "John Doe",
      location: "United States",
      userType: "freelancer",
      rating: 4.5,
      ghoSpent: 0,
    },
  ];

  if (
    walletAddress === "0x69E5B636F0dC211d27419b78cb5B002Dc55B4526" ||
    walletAddress === "0x1C6fa4aD2Ff12713dc260fB133064B221bE49e47"
  ) {
    return data[0];
  } else if (walletAddress === "0x811BA0F133153677Fe9809540dd301c28743BF87") {
    return data[1];
  } else {
    return { name: "", location: "", userType: "na", rating: 0, ghoSpent: 0 };
  }
}
