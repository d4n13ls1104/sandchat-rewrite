import React from "react";
import { Success } from "../common/Success";
import { Error } from "../common/Error";
import { FormAlertWrapper } from "./FormAlertWrapper";

interface FormAlertProps {
  type: "success" | "error";
}

export const FormAlert: React.FC<FormAlertProps> = ({ type, children }) => {
  return (
    <FormAlertWrapper>
      {type === "success" ? (
        <Success>{children}</Success>
      ) : (
        <Error>{children}</Error>
      )}
    </FormAlertWrapper>
  );
};
