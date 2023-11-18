import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @MaxLength(50, {message: 'FirstName is too long',})
  @IsString()
  @IsNotEmpty({ message: 'Field cannot be empty' })
  firstName: string;

  @MaxLength(50, { message: 'LastName is too long'})
  @IsNotEmpty({ message: 'Field cannot be empty' })
  lastName: string;

  @MaxLength(50, {message: 'Email is too long',})
  @IsString()
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Field cannot be empty' })
  email: string

  @MaxLength(50, {message: 'Password is too long',})
  @IsString()
  @MinLength(8, {message: 'Password is too short',})
  @IsNotEmpty({ message: 'Field cannot be empty' })
  password: string;
}
