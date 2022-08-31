import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
