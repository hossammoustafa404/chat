import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos';
import { UserRepository } from '../user/repositories';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
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
}
