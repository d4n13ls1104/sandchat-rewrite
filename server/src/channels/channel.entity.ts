import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum ChannelType {
  DM = 0,
  GROUP_DM = 1,
  GUILD_TEXT = 2,
}

@Entity()
@ObjectType()
export class Channel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ChannelType,
  })
  type: ChannelType;

  @Field()
  @Column('text', { nullable: true })
  name?: string;

  @ManyToMany(() => User)
  members: User[];
}
