"use client";

import { User } from "@/types";
import { useState, useEffect } from "react";
import { userService } from "@/services/users";

interface UseFetchUsersResult {
  users: User[] | null;
  isLoading: boolean;
  error: Error | null;
  fetchUsers: () => void;
}

const useFetchUsers = (): UseFetchUsersResult => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, fetchUsers };
};

export default useFetchUsers;
