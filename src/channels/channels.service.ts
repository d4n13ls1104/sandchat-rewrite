import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Channel, ChannelType } from './channel.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel) private channelsRepository: Repository<Channel>,
  ) {}

  async createDMChannel(members: User[]): Promise<Channel> {
    return this.channelsRepository.create({
      type: ChannelType.DM,
      members,
    });
  }

  async createGroupDMChannel(owner: User): Promise<Channel> {
    const channel = this.channelsRepository.create({
      type: ChannelType.GROUP_DM,
      name: 'Group DM',
      members: [owner],
    });

    return this.channelsRepository.save(channel);
  }
}
