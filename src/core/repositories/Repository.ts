interface Repository<T, ID> {
  create?(item: T): Promise<T>;

  delete?(id: ID): Promise<boolean>;

  findAll?(options: object): Promise<T[]>;

  findOne?(id: ID): Promise<T> | null;

  update?(id: ID, item: T): Promise<T>;
}

export default Repository;
