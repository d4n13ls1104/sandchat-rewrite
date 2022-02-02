import * as yup from 'yup';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

export const createUserValidationSchema = yup.object().shape({
  email: yup.string().min(3).max(255).email().required(),

  username: yup
    .string()
    .min(3)
    .max(16)
    .matches(/^[a-zA-Z0-9_.]*$/, {
      message: "Username may only contain letters, numbers or '_', '.'",
    })
    .required(),

  password: yup.string().min(8).max(255).required(),
});
