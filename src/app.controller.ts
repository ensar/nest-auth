import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';
import { IUser } from './interfaces/auth';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signup')
  async signup(@Body() body: CreateUserDto): Promise<Required<IUser>> {
    return this.authService.signup(body);
  }

  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);

    if (user) {
      return this.authService.login(user);
    } else {
      throw new BadRequestException();
    } 
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
