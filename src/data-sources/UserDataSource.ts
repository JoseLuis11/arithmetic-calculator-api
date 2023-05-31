import { Repository } from 'typeorm';
import postgresDataSource from './postgres/connection';
import DBOperationHandler from './utils/dbOperationHandler';
import UserRepository from '@core/repositories/UserRepository';
import { User } from '@entities';
import UserSchema from './typeorm/schemas/UserSchema';
import DbOperationHandler from './utils/dbOperationHandler';

class UserDataSource implements UserRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = postgresDataSource.getRepository<User>(UserSchema)
  }

  async create(user: User): Promise<User> {
    let createdUser;
    await DBOperationHandler(postgresDataSource, async () => {
      createdUser = await this.repository.create(user)
      await this.repository.save(createdUser);
    });
    return createdUser;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    let foundUser;
    await DbOperationHandler(postgresDataSource, async () => {
      foundUser = await this.repository.findOneBy({ username: username })
    })
    return foundUser;
  }
}

export default UserDataSource;
