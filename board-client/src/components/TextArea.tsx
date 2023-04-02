import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { Input } from "antd";

import { InputProps } from "./Input";

const { TextArea: AntDTextArea } = Input;

const TextArea: React.FC<InputProps> = ({
  control,
  prefix,
  placeholder,
  name,
  rules,
  errors,
  className,
  rows,
  ...otherProps
}) => (
  <>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <AntDTextArea
          {...field}
          placeholder={placeholder}
          prefix={prefix}
          rows={rows}
          className={className}
          {...otherProps}
        />
      )}
    />
    {errors && errors[name] && (
      <span className="text-xs text-red-500">{errors[name].message}</span>
    )}
  </>
);

export default TextArea;
