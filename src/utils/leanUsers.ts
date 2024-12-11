import { User } from "@/interfaces";

export const leanUsers = (users: User[]) => {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName
    }));
  };