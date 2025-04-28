import { Model, ObjectId } from 'mongoose';

export class BaseRepository<SchemaClass, DomainEntity> {
  constructor(
    private readonly model: Model<SchemaClass>,
    private readonly mapper: any,
  ) {}

  public async createOne(data: Partial<DomainEntity>): Promise<DomainEntity> {
    const record = await this.model.create(this.mapper.toPersistence(data));
    return this.mapper.toDomain(record);
  }

  public async findOneById(id: string): Promise<DomainEntity | null> {
    const record = await this.model.findById(id).select('-firstName -lastName');
    return record ? this.mapper.toDomain(record) : null;
  }

  public async findMany(): Promise<DomainEntity[]> {
    const records = await this.model.find();
    return records.map((record) => this.mapper.toDomain(record));
  }

  public async updateOneById(
    id: string,
    data: Partial<DomainEntity>,
  ): Promise<DomainEntity | null> {
    const record = await this.model.findByIdAndUpdate(
      id,
      this.mapper.toPersistence(data),
      { new: true },
    );
    return record ? this.mapper.toDomain(record) : null;
  }

  public async deleteOneById(id: string): Promise<DomainEntity | null> {
    const record = await this.model.findOneAndDelete({ id });
    return record ? this.mapper.toDomain(record) : null;
  }
}
