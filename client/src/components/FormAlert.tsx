import React from "react";
import styled from "styled-components";

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

const FormAlertWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-end;
  flex-direction: column;
  width: 350px;
  height: 50px;
  @media (max-height: 1000px) {
    margin-top: 20vh;
  }
`;

const Success = styled.div`
  background-color: #a7f3d0;
  color: #059669;
  width: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: left;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  box-sizing: border-box;
  align-self: flex-end;
`;

const Error = styled.div`
  background-color: #fecaca;
  color: #f00;
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: left;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  box-sizing: border-box;
  align-self: flex-end;
`;
