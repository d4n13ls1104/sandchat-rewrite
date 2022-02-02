import { Field, ObjectType } from '@nestjs/graphql';
import { CreateUserResponse } from '../../users/dto/create-user-response';
import { FieldError } from '../../users/dto/field-error';
import { User } from '../../users/user.entity';

@ObjectType()
export class LoginUserResponse extends CreateUserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  access_token?: string;
}
