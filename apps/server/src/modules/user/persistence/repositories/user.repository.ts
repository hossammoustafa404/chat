import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../../../shared/repositories';
import { UserSchemaClass } from '../entities';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers';
import { UserEntity } from '../../domain';

@Injectable()
export class UserRepository extends BaseRepository<
  UserSchemaClass,
  UserEntity
> {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly userModel: Model<UserSchemaClass>,
  ) {
    super(userModel, UserMapper);
  }

  public emailExists(email: string) {
    return this.userModel.exists({ email });
  }

  public async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user ? UserMapper.toDomain(user) : null;
  }
}
