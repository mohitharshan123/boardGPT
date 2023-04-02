import { Input } from "@/components";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useCreateTask } from "hooks/requests/useBoardApi";
import { toast } from "react-toastify";

export type AddTaskProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TaskCreatePayload = { prompt: string };

const AddTask = ({ isOpen, onClose }: AddTaskProps) => {
  const { mutate: createTask } = useCreateTask();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (values: TaskCreatePayload) =>
    createTask(values, {
      onSuccess: () => {
        onClose();
        toast.success("Successfully created");
      },
      onError: () => toast.error("An error occurred"),
    });

  return (
    <Modal open={isOpen} onCancel={onClose} onOk={handleSubmit(onSubmit)}>
      <Input
        className="mt-12"
        name="prompt"
        rules={{ required: "Please enter task description" }}
        placeholder="Enter task description"
        control={control}
        errors={errors}
      />
    </Modal>
  );
};

export default AddTask;
