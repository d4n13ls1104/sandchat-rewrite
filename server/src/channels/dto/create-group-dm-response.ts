import { Field, ObjectType } from '@nestjs/graphql';
import { ApiError } from '../../types/api-error';
import { Channel } from '../channel.entity';

@ObjectType()
export class CreateGroupDMResponse {
  @Field(() => ApiError, { nullable: true })
  errors?: ApiError[];

  @Field(() => Channel, { nullable: true })
  channel?: Channel;
}
