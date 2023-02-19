import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";

import { Input } from "components";
import routes from "@/routes";
import { useLogin } from "hooks/requests/useAccountApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  showRegister: () => void;
};
type Credentials = { username: string; password: string };

const Login: React.FC<LoginProps> = ({ showRegister }) => {
  const { mutate: loginUser, isLoading } = useLogin();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (values: Credentials) =>
    loginUser(values, {
      onSuccess: () => {
        toast.success("Success!");
        navigate(routes.dashboard);
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
