import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Input as AntDInput } from "antd";

type InputProps = {
  control: Control<FieldValues, any>;
  name: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  rules?: Omit<
    RegisterOptions<FieldValues, "username">,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  errors?: FieldErrors<FieldValues>;
  className?: string;
  otherProps: any;
};

const Input: React.FC<InputProps> = ({
  control,
  prefix,
  placeholder,
  name,
  rules,
  errors,
  className,
  otherProps,
}) => (
  <>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <AntDInput
          {...field}
          placeholder={placeholder}
          prefix={prefix}
          className={className}
        />
      )}
    />
    {errors && errors[name] && (
      <span className="text-xs text-red-500">{errors[name].message}</span>
    )}
  </>
);

export default Input;
