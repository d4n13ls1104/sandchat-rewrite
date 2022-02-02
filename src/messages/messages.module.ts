import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Channel } from '../channels/channel.entity';

@Module({
  providers: [MessagesService, MessagesResolver],
  imports: [
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Channel]),
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
