import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = { 
    label: string;
    name: string;
    placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({ label, placeholder, ...props }) => {
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={placeholder}/>
            {!!error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}