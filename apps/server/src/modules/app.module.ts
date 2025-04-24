import { Module } from '@nestjs/common';
import { DatabaseModule } from '../shared/database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import config from '../shared/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
      validationSchema: Joi.object({
        BASE_URL: Joi.string().required(),
        PORT: Joi.number().port().default(3000),
        MONGO_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
