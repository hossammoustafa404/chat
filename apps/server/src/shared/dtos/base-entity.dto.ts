import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityDto {
  @ApiProperty({ example: '680c9e22cdba269098dd53be' })
  id: string;

  @ApiProperty({ example: '2025-04-26T08:49:38.974Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-04-26T08:49:38.974Z' })
  updatedAt: Date;
}
