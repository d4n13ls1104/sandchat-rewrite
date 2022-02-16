import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navigate } from "react-router-dom";
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
  const [success, setSuccess] = useState(false);
  const [, login] = useLoginMutation();
  const inputRef = useRef(input) as MutableRefObject<typeof initialInput>;
  inputRef.current = input;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = useCallback(() => {
    setError(undefined);
    setLoading(true);

    login(inputRef.current).then((result) => {
      if (!result.data) return;

      const { errors, access_token } = result.data.login;

      if (errors) setError(errors[0]);

      if (access_token) {
        localStorage.setItem("auth", access_token);
        setSuccess(true);
      }
    });
    setLoading(false);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      {!!error ? <FormAlert type='error'>{error?.message}</FormAlert> : null}

      {success ? <Navigate to='/home' /> : null}

      <FormWrapper>
        <h1 style={{ margin: 0 }}>Login</h1>
        <FormInput
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          value={input.email}
          type='email'
          placeholder='Email address'
        />
        <FormInput
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          value={input.password}
          type='password'
          placeholder='Password'
        />
        <FormButton onClick={handleSubmit} loading={loading}>
          Login
        </FormButton>
        <FormSubText>
          Already have an account?{" "}
          <Link to='/' style={{ textDecoration: "none", cursor: "pointer" }}>
            <LinkText>Register</LinkText>
          </Link>
          !
        </FormSubText>
      </FormWrapper>
    </>
  );
};
