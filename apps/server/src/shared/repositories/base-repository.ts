import { AnyKeys, Model, ObjectId } from 'mongoose';

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async createOne(data: Partial<T>) {
    const result = await this.model.create(data);
    console.log(result);
    return result.toObject();
  }

  public findOneById(id: ObjectId) {
    return this.model.findById(id);
  }

  public findMany() {
    return this.model.find();
  }

  public updateOneById(id: ObjectId, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  public deleteOneById(id: ObjectId) {
    return this.model.findOneAndDelete({ id });
  }
}
