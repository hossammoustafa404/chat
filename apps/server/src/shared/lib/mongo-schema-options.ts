import { SchemaOptions } from '@nestjs/mongoose';

export const mongoSchemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
};
