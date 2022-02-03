import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from '../channels/channel.entity';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Field()
  @Column('text', { unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column('text', { default: '/images/default_avatar.png' })
  avatar: string;

  @Generated('uuid')
  @Column()
  tokenVersion: string;

  @ManyToMany(() => Channel, (channel) => channel.members)
  @JoinTable()
  channels: Channel[];

  @Field()
  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
