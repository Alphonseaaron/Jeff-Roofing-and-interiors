import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMessages,
  sendMessage,
  subscribeToMessages,
  markMessageAsRead,
} from "@/lib/firestore";
import { Message, InsertMessage } from "@shared/schema";
import { useEffect } from "react";

export const useMessages = (projectId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['messages', projectId],
    queryFn: () => getMessages(projectId),
    enabled: !!projectId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  useEffect(() => {
    if (!projectId) return;

    const unsubscribe = subscribeToMessages(
      projectId,
      (messages: Message[]) => {
        queryClient.setQueryData(['messages', projectId], messages);
      }
    );

    return unsubscribe;
  }, [queryClient, projectId]);

  return query;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.projectId] });
    },
  });
};

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};
