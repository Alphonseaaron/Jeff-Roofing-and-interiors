import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  subscribeToProjects,
} from "@/lib/firestore";
import { Project, InsertProject } from "@shared/schema";
import { useEffect } from "react";

export const useProjects = (filters?: {
  clientId?: string;
  teamLeadId?: string;
  status?: string;
}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => getProjects(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      (projects: Project[]) => {
        queryClient.setQueryData(['projects', filters], projects);
      },
      filters
    );

    return unsubscribe;
  }, [queryClient, filters]);

  return query;
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Project> }) =>
      updateProject(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
    },
  });
};
