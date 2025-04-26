import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Hossam' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Moustafa' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ValidateIf((obj) => obj.password !== obj.confirmPassword)
  @IsDefined({ message: 'Passwords do not match' })
  passwordsMatch: string;
}
