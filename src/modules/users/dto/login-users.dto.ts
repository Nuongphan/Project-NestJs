import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string

  @IsString()
  @MinLength(8, {message: 'Password is too short',})
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
