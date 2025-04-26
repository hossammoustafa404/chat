import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntityDto } from '../../../shared/dtos';

export class UserDto extends BaseEntityDto {
  @ApiProperty({ example: 'Hossam' })
  firstName: string;

  @ApiProperty({ example: 'Moustafa' })
  lastName: string;

  @ApiProperty({ example: 'test@example.com' })
  email: string;

  @Exclude()
  password: string;
}
