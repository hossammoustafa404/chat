import { UserEntity } from '../../domain';
import { UserSchemaClass } from '../entities';

export class UserMapper {
  static toDomain = (persistenceEntity: UserSchemaClass) => {
    const domainEntity = new UserEntity();

    domainEntity.id = persistenceEntity._id.toString();
    domainEntity.createdAt = persistenceEntity.createdAt;
    domainEntity.updatedAt = persistenceEntity.updatedAt;
    domainEntity.firstName = persistenceEntity.firstName;
    domainEntity.lastName = persistenceEntity.lastName;
    domainEntity.email = persistenceEntity.email;
    domainEntity.password = persistenceEntity.password;

    return domainEntity;
  };

  static toPersistence = (domainEntity: UserEntity) => {
    const persistenceEntity = new UserSchemaClass();

    persistenceEntity.firstName = domainEntity.firstName;
    persistenceEntity.lastName = domainEntity.lastName;
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.password = domainEntity.password;

    return persistenceEntity;
  };
}
