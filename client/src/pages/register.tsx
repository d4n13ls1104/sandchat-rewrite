import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LinkText } from "../components/common/Link";
import { FormAlert } from "../components/form/FormAlert";
import { FormButton } from "../components/form/FormButton";
import { FormInput } from "../components/form/FormInput";
import { FormSubText } from "../components/form/FormSubText";
import { FormWrapper } from "../components/form/FormWrapper";
import { useCreateUserMutation } from "../generated/graphql";

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
  const [, createUser] = useCreateUserMutation();
  const [error, setError] = useState<FieldError>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<typeof initialInput>;

  inputRef.current = input;

  useEffect(() => {
    window.addEventListener("keypress", handleKeyDown);

    return () => {
      window.removeEventListener("keypress", handleKeyDown);
    };
  }, []);

  const handleSubmit = () => {
    // Reset error
    setError(undefined);

    setLoading(true);

    createUser(inputRef.current).then((result) => {
      if (!result.data) return;

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
