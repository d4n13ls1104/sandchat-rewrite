import React, { useState } from "react";
import styled from "styled-components";
import { formatDocument, useMutation } from "urql";
import { FormAlert } from "../components/FormAlert";

const CREATE_USER_MUTAITON = `
  mutation createUser(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(createUserInput: { email: $email, username: $username, password: $password }) {
      user {
        id,
        username,
        createdAt
      },
      errors {
        field,
        message
      }
    }
  }
`;

const initialInput = {
  email: "",
  username: "",
  password: "",
};

interface FieldError {
  field: string;
  message: string;
}

export const Register: React.FC = () => {
  const [input, setInput] = useState(initialInput);
  const [, createUser] = useMutation(CREATE_USER_MUTAITON);
  const [error, setError] = useState<FieldError>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean | undefined>();

  const handleSubmit = () => {
    setError(undefined);
    setLoading(true);
    createUser(input).then((result) => {
      if (result.data.createUser.user) {
        setInput(initialInput);
        setSuccess(true);
      }

      if (result.data.createUser.errors) {
        const { field, message } = result.data.createUser.errors[0];
        setError({
          field,
          message,
        });
      }
    });
    setLoading(undefined);
  };

  return (
    <>
      {error != undefined ? (
        <FormAlert type="error">{error?.message}</FormAlert>
      ) : null}

      {success ? <FormAlert type="success">Account created.</FormAlert> : null}
      <FormWrapper>
        <h1>Register</h1>
        <FormInput
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          value={input.email}
          type="email"
          placeholder="Email address"
        />
        <FormInput
          onChange={(e) => setInput({ ...input, username: e.target.value })}
          value={input.username}
          type="text"
          placeholder="Username"
        />
        <FormInput
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          value={input.password}
          type="password"
          placeholder="Password"
        />
        <FormButton onClick={handleSubmit} loading={loading}>
          Register
        </FormButton>
        <FormSubText>
          Already have an account? <Link href="/login">Login</Link>!
        </FormSubText>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: 380px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

const FormInput = styled.input`
  height: 14%;
  background-color: #242c37;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px;
  color: #dee3ea;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  outline: none;
  transition: padding 150ms;

  :hover {
    padding: 13px;
  }
`;

const FormButton = styled.button<{ loading?: boolean }>`
  height: 14%;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${(props) => (props.loading ? "#D1D5DB" : "#4C21E8")};
  font-size: 18px;
  color: ${(props) => (props.loading ? "#9CA3AF" : "#fff")};
  font-weight: bold;
  transition: background-color 200ms;
  cursor: pointer;
  outline: none;

  :hover {
    background-color: ${(props) => (props.loading ? "" : "#3D15CB")};
  }
`;

const FormSubText = styled.span`
  text-align: center;
  color: #b2bdcd;
`;

const Link = styled.a<{
  linkColor?: string | undefined;
  hoverColor?: string | undefined;
}>`
  color: ${(props) =>
    props.linkColor !== undefined ? props.linkColor : `#4C21E8`};
  text-decoration: none;
  transition: color 150ms;

  :hover {
    color: ${(props) =>
      props.hoverColor !== undefined ? props.hoverColor : ""};
  }
`;
