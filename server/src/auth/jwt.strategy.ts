import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  sub: string;
  username: string;
  tokenVersion: string;
  exp: number;
  iat: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      logging: true,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findByUsername(payload.username);

    if (!user) return null;

    // If token was invalidated
    if (user.tokenVersion !== payload.tokenVersion) return null;

    return { userId: payload.sub, username: payload.username };
  }
}
