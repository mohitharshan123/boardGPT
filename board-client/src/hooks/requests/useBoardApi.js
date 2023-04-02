import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState, useEffect } from "react";

import boardApi from "../../apis/board";
import { QUERY_KEYS } from "../../apis/constants";

const useGetBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { data, isLoading } = useQuery(QUERY_KEYS.board, boardApi.show, {
    select: ({ data }) => data,
    staleTime: 100_000,
  });

  useEffect(() => {
    if (isLoading) return;
    setTasks(data.tasks);
  }, [data, isLoading]);

  return { data: { tasks }, setTasks, isLoading };
};

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(boardApi.createTask, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.board),
  });
};

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(boardApi.updateTask, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.board),
  });
};

const useCreateCard = () => {
  const queryClient = useQueryClient();
  return useMutation(boardApi.createCard, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.board),
  });
};

const useUpdateCard = () => {
  const queryClient = useQueryClient();
  return useMutation(boardApi.updateCard, {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEYS.board),
  });
};

export {
  useGetBoard,
  useCreateTask,
  useUpdateTask,
  useCreateCard,
  useUpdateCard,
};
