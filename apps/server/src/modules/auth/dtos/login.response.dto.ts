import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dtos';

export class LoginResponseDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty({
    example:
      'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODBmMWMxNmMyYmQxYTU0YmU1ZGJlMzgiLCJpYXQiOjE3NDU4Mzk5MjEsImV4cCI6MTc0NTg0MDIyMX0.mYfbpOVwZRux7n5IwlBXKtc7RLlNkjnhV-j0qvwXfmM',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODBmMWMxNmMyYmQxYTU0YmU1ZGJlMzgiLCJpYXQiOjE3NDU4Mzk5MjEsImV4cCI6MTc0NzEzNTkyMX0.uCgJU1opTTfYFcjsSzxwQ6-gGqshc-uVDUbqjllFfHw',
  })
  refreshToken: string;
}
