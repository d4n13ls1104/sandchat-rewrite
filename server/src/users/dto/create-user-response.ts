import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from './field-error';
import { User } from '../user.entity';

@ObjectType()
export class CreateUserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
