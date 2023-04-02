import { useMemo, useEffect } from "react";
import { Input } from "@/components";
import { useForm } from "react-hook-form";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

import { useShowUser, useUpdateUser } from "hooks/requests/useAccountApi";
import { BiKey } from "react-icons/bi";

export type UserPayload = {
  openai_secret: string;
};

const Settings = () => {
  const { mutate: updateUser } = useUpdateUser();
  const { data: user } = useShowUser();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  useEffect(() => setValue("openai_secret", user?.openai_secret), [user]);

  const onSubmit = (values: UserPayload) =>
    updateUser(values, {
      onSuccess: () => toast.success("Successfully updated"),
    });

  return (
    <div className="w-full h-screen flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 w-1/3"
      >
        <div className="flex flex-col space-y-2">
          <Input
            className="mt-4"
            prefix={<BiKey />}
            name="openai_secret"
            rules={{ required: "Please enter secret key" }}
            placeholder="Enter your OpenAI secret key"
            control={control}
            errors={errors}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="transition ease-in-out delay-150 bg-primary hover:scale-105 hover:bg-indigo-800 duration-300 px-20 py-2 rounded-xl"
        >
          <span className="text-white">Save</span>
        </button>
      </form>
    </div>
  );
};

export default Settings;
