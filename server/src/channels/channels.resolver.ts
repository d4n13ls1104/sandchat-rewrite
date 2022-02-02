import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/dto/jwt-auth.guard';
import { HttpContext, UserSession } from '../users/dto/user-session';
import { User } from '../users/user.entity';
import { ChannelsService } from './channels.service';
import { CreateGroupDMResponse } from './dto/create-group-dm-response';

@Resolver()
export class ChannelsResolver {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private channelsService: ChannelsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateGroupDMResponse)
  async createGroupDMChannel(
    @Context() ctx: HttpContext,
  ): Promise<CreateGroupDMResponse> {
    if (!ctx.req.user) throw new UnauthorizedException();

    const user = await this.usersRepository.findOne(
      (ctx.req.user! as UserSession).userId,
    );

    if (!user) throw new UnauthorizedException();

    const channel = await this.channelsService.createGroupDMChannel(user);
    console.log(channel);

    return { channel };
  }
}
