import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import routes from "@/routes";
import { Input } from "components";
import { useRegister } from "hooks/requests/useAccountApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
  showLogin: () => void;
};
type Credentials = { username: string; password: string };

const Register: React.FC<RegisterProps> = ({ showLogin }) => {
  const { mutate: registerUser, isLoading } = useRegister();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (values: Credentials) =>
    registerUser(values, {
      onSuccess: () => {
        toast.success("Successfully registered user");
        navigate(routes.dashboard);
      },
      onError: () => toast.error("An error occuurred"),
    });

  return (
    <div className="flex flex-col space-y-3">
      <span className="text-3xl">Sign up</span>
      <span className="font-light">
        If you don't have an account, you can{" "}
        <a
          className="text-primary hover:text-blue-600 cursor-pointer focus:underline"
          onClick={showLogin}
        >
          sign in
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
            rules={{ required: true }}
            placeholder="Enter your username"
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            prefix={<RiLockPasswordLine />}
            name="password"
            rules={{ required: true }}
            placeholder="Enter your password"
            control={control}
            errors={errors}
          />
        </div>
        <button
          type="submit"
          className="transition ease-in-out delay-150 bg-primary hover:scale-105 hover:bg-indigo-800 duration-300 px-20 py-2 rounded-xl"
        >
          <span className="text-white">Sign up and start</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
