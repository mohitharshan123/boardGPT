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
    setTasks(data?.tasks);
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
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(QUERY_KEYS.board);
      queryClient.invalidateQueries([QUERY_KEYS.card, id]);
    },
  });
};

const useShowCard = (id) =>
  useQuery([QUERY_KEYS.card, id], () => boardApi.showCard(id), {
    staleTime: 100_000_000,
    refetchOnWindowFocus: false,
    enabled: !!id,
    select: (response) => response.data,
  });

export {
  useGetBoard,
  useCreateTask,
  useUpdateTask,
  useCreateCard,
  useUpdateCard,
  useShowCard,
};
