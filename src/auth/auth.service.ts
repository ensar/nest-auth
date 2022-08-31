import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IToken, IUser } from '../interfaces/auth';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const passwordsMatch = await bcrypt.compareSync(pass, user.password);
    if (user && passwordsMatch) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async signup(body): Promise<Required<IUser>> {
    return this.usersService.create(body);
  }

  async login({
    username,
    _id,
    email,
  }: Omit<IUser, 'password'>): Promise<IToken> {
    const payload: Omit<IUser, 'password'> = { username, email, _id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
