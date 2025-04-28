import { ObjectId } from 'mongoose';

export class BaseSchemaClass {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
