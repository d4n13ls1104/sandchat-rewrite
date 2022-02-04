import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import { Link } from "react-router-dom";
import { LinkText } from "../components/common/Link";
import { FormAlert } from "../components/form/FormAlert";
import { FormButton } from "../components/form/FormButton";
import { FormInput } from "../components/form/FormInput";
import { FormSubText } from "../components/form/FormSubText";
import { FormWrapper } from "../components/form/FormWrapper";
import { CREATE_USER_MUTAITON } from "../gql/Mutations";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = () => {
    // Reset previous error because there's a new request
    setError(undefined);

    setLoading(true);

    createUser(input).then((result) => {
      // If register was successful
      if (result.data.createUser.user) {
        setInput(initialInput);

        setSuccess(true);
      }

      // If the server returned errors
      if (result.data.createUser.errors) {
        const { field, message } = result.data.createUser.errors[0];
        setError({
          field,
          message,
        });
      }
    });
    setLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
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
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <LinkText>Login</LinkText>
          </Link>
          !
        </FormSubText>
      </FormWrapper>
    </>
  );
};
