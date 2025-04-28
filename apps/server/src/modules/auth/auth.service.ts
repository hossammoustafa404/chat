import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dtos';
import { UserRepository } from '../user/persistence/repositories';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  public async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Check that the email is not taken
    const emailExists = await this.userRepository.emailExists(email);

    if (emailExists) {
      throw new ConflictException('Email is taken');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create the user
    const createdUser = await this.userRepository.createOne(
      omit({ ...registerDto, password: hashedPassword }, ['confirmPassword']),
    );

    // Return the created user
    return createdUser;
  }

  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const foundUser = await this.userRepository.findOneByEmail(email);

    // Throw generic error if the user not found
    if (!foundUser) {
      throw new UnauthorizedException('Bad credentials');
    }

    // Check that the password is correct
    const passwordCorrect = await bcrypt.compare(password, foundUser.password);

    // Throw generic error if the password is wrong
    if (!passwordCorrect) {
      throw new UnauthorizedException('Bad credentials');
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = this.generateTokens(foundUser.id);

    // Return the user and tokens
    return {
      user: plainToInstance(UserDto, foundUser),
      accessToken,
      refreshToken,
    };
  }

  private generateTokens(userId: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>('jwt.accessTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.accessTokenExpiresIn'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn'),
      },
    );

    return { accessToken, refreshToken };
  }
}
