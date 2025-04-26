import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { SerializationInterceptor } from '../interceptors';

export const Serialize = (dto: ClassConstructor<unknown>) => {
  return UseInterceptors(new SerializationInterceptor(dto));
};
