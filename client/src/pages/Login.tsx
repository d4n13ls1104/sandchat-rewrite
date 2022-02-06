import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LinkText } from "../components/common/Link";
import { FormAlert } from "../components/form/FormAlert";
import { FormButton } from "../components/form/FormButton";
import { FormInput } from "../components/form/FormInput";
import { FormSubText } from "../components/form/FormSubText";
import { FormWrapper } from "../components/form/FormWrapper";
import { useLoginMutation } from "../generated/graphql";

const initialInput = {
  email: "",
  password: "",
};

interface FieldError {
  field: string;
  message: string;
}

export const Login: React.FC = () => {
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState<FieldError>();
  const [loading, setLoading] = useState(false);
  const [, login] = useLoginMutation();
  const inputRef = useRef(input) as React.MutableRefObject<typeof initialInput>;
  inputRef.current = input;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = () => {
    // Reset error
    setError(undefined);

    setLoading(true);

    login(inputRef.current).then((result) => {
      if (!result.data) return;

      // If access_token was returned the login was successful
      if (result.data.login.access_token) {
        localStorage.setItem("auth", result.data.login.access_token);
      }

      // If the server returned errors
      if (result.data.login.errors) {
        const { field, message } = result.data.login.errors[0];

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

      <FormWrapper>
        <h1>Login</h1>
        <FormInput
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          value={input.email}
          type="email"
          placeholder="Email address"
        />
        <FormInput
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          value={input.password}
          type="password"
          placeholder="Password"
        />
        <FormButton onClick={handleSubmit} loading={loading}>
          Login
        </FormButton>
        <FormSubText>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
            <LinkText>Register</LinkText>
          </Link>
          !
        </FormSubText>
      </FormWrapper>
    </>
  );
};
