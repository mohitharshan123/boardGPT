import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Input } from "components";
import routes from "@/routes";
import { useLogin } from "hooks/requests/useAccountApi";
import useAuthStore from "stores/useAuthStore";

type LoginProps = {
  showRegister: () => void;
};
export type Credentials = { username: string; password: string };

export type LoginResponse = { access: string; refresh: string };

const Login: React.FC<LoginProps> = ({ showRegister }) => {
  const { mutate: loginUser } = useLogin();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (values: Credentials) =>
    loginUser(values, {
      onSuccess: (values: LoginResponse) => {
        const user = jwt_decode(values.access);
        setUser(user);
        toast.success("Succcessfully logged in!");
        setTimeout(() => navigate(routes.dashboard.index), 500);
      },
      onError: () => toast.error("Invalid credentials"),
    });

  return (
    <div className="flex flex-col space-y-3">
      <span className="text-3xl">Sign in</span>
      <span className="font-light">
        If you don't have an account, you can{" "}
        <a
          className="text-primary hover:text-blue-600 cursor-pointer focus:underline"
          onClick={showRegister}
        >
          sign up
        </a>
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <Input
            className="mt-4"
            prefix={<MdOutlineMail />}
            name="username"
            rules={{ required: "Username is required" }}
            placeholder="Enter your username"
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            prefix={<RiLockPasswordLine />}
            name="password"
            rules={{ required: "Password is required" }}
            placeholder="Enter your password"
            control={control}
            errors={errors}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="transition ease-in-out delay-150 bg-primary hover:scale-105 hover:bg-indigo-800 duration-300 px-20 py-2 rounded-xl"
        >
          <span className="text-white">Sign in</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
