import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApiError {
  @Field()
  code: string;

  @Field()
  message: string;
}
