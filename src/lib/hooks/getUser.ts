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
  ];

  return data[0];
}
