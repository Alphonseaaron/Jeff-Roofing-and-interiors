import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/firestore";
import { USER_ROLES } from "@shared/schema";

export const useUsers = (role?: string) => {
  return useQuery({
    queryKey: ['/api/users', role],
    queryFn: () => getUsers(role),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['/api/users/team'],
    queryFn: () => getUsers(USER_ROLES.TEAM_LEADER),
    staleTime: 5 * 60 * 1000,
  });
};