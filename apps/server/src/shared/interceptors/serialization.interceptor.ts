import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

export class SerializationInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map((data) => plainToInstance(this.dto, data)));
  }
}
