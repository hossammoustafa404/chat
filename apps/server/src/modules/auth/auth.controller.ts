import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Serialize } from '../../shared/decorators';
import { UserDto } from '../user/dtos';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'The user is successfully registered',
    type: UserDto,
  })
  @ApiConflictResponse({ description: 'Email is taken' })
  @Serialize(UserDto)
  @Post('register')
  public register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
