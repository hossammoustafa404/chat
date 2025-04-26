import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../../shared/repositories';
import { User } from '../entities';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly catModel: Model<User>) {
    super(catModel);
  }

  public emailExists(email: string) {
    return this.catModel.exists({ email });
  }
}
