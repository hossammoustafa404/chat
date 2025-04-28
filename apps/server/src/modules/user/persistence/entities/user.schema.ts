import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { BaseSchemaClass, mongoSchemaOptions } from '../../../../shared/lib';

export type UserDocument = HydratedDocument<UserSchemaClass>;

@Schema(mongoSchemaOptions)
export class UserSchemaClass extends BaseSchemaClass {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
