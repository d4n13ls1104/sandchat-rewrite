import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user-input';
import { LoginUserResponse } from './dto/login-user-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(loginUserInput: LoginUserInput): Promise<User | null> {
    const user = await this.usersService.findByEmail(loginUserInput.email);

    if (!user) return null;

    const passwordIsCorrect = await verify(
      user.password,
      loginUserInput.password,
    );

    if (passwordIsCorrect) return user;

    return null;
  }

  async login(user: User): Promise<LoginUserResponse> {
    const updatedUser = await this.usersService.invalidateAuthToken(user);
    return {
      user: updatedUser,
      access_token: this.jwtService.sign({
        sub: user.id,
        username: user.username,
        tokenVersion: updatedUser.tokenVersion,
      }),
    };
  }
}
