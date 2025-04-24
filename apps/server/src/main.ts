import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const baseUrl = configService.get<string>('app.baseUrl');
  const port = configService.get<number>('app.port');

  await app.listen(port as number);

  Logger.log(`Server is listening on: ${baseUrl}`);
}

bootstrap();
