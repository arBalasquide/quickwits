import { FieldMessage } from "../generated/graphql";

export const toErrorMap = (errors: FieldMessage[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

