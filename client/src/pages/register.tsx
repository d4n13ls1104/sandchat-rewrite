import React, { useState } from "react";
import { useMutation } from "urql";
import { Link } from "../components/common/Link";
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
