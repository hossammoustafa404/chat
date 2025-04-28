import { BaseEntity } from '../../../shared/entities';

export class UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
