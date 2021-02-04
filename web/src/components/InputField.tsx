import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = {
  color: string;
  label: string;
  name: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  color,
  label,
  placeholder,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel color="white" htmlFor={field.name}>
        {label}
      </FormLabel>
      <Input
        bgColor="black"
        {...field}
        {...props}
        id={field.name}
        placeholder={placeholder}
      />
      {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
