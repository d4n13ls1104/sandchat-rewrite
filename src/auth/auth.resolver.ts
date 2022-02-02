import * as FieldErrors from '../constants/field-errors';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user-input';
import { LoginUserResponse } from './dto/login-user-response';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './dto/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { HttpContext, UserSession } from '../users/dto/user-session';

@Resolver()
export class AuthResolver {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => LoginUserResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginUserResponse> {
    const accountExists = await this.usersService.findByEmail(
      loginUserInput.email,
    );

    if (!accountExists) {
      return {
        errors: [FieldErrors.EMAIL_NOT_REGISTERED],
      };
    }

    const user = await this.authService.authenticateUser(loginUserInput);

    if (!user) {
      return {
        errors: [FieldErrors.INVALID_CREDENTIALS],
      };
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async logout(@Context() ctx: HttpContext): Promise<boolean> {
    const user = await this.usersRepository.findOne(
      (ctx.req.user as UserSession).userId,
    );

    if (!user) return false;

    this.usersService.invalidateAuthToken(user);

    return true;
  }
}
