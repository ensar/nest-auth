import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
