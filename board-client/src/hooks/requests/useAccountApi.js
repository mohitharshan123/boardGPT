import { useMutation } from "react-query";
import { login, register } from "../../apis/account";

const useLogin = () => useMutation(login);
const useRegister = () => useMutation(register);

export { useLogin, useRegister };
