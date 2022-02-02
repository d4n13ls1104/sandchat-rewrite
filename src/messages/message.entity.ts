import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from '../channels/channel.entity';
import { User } from '../users/user.entity';

@Entity()
@ObjectType()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Field()
  // @Column('uuid', { nullable: true })
  // guild_id?: string;

  @Field()
  @ManyToOne(() => User)
  author: User;

  @Field()
  @Column()
  content: string;

  @Field()
  @PrimaryColumn()
  authorId: string;

  @Field()
  @PrimaryColumn()
  channelId: string;

  @Field()
  @ManyToOne(() => Channel, (channel) => channel.messages)
  @JoinColumn()
  channel: Channel;

  @Field()
  @Column('time with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column('boolean', { default: false })
  is_deleted: boolean;
}
