import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/interfaces/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get<string>('SECRET_KEY'),
    });
  }

  async validate(payload: Omit<IUser, 'password'>) {
    const { _id, username, email } = payload;
    return { _id, username, email };
  }
}
