import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { User } from '../users/user.entity';

@Module({
  providers: [ChannelsService, ChannelsResolver],
  imports: [
    TypeOrmModule.forFeature([Channel]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [ChannelsService],
})
export class ChannelsModule {}
