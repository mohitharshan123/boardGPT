import { useMutation, useQuery, useQueryClient } from "react-query";
import { login, register, updateUser, showUser } from "../../apis/account";
import { QUERY_KEYS } from "../../apis/constants";

const useLogin = () => useMutation(login);
const useRegister = () => useMutation(register);

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.user);
    },
  });
};

const useShowUser = () =>
  useQuery(QUERY_KEYS.user, showUser, {
    staleTime: 100_000,
    refetchOnWindowFocus: false,
  });

export { useLogin, useRegister, useUpdateUser, useShowUser };
