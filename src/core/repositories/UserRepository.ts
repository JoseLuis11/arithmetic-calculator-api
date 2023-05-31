import Repository from './Repository';
import { User } from '@entities';

interface UserRepository extends Repository<User, string>{
  create(user: User): Promise<User>;

  findOneByUsername(username: string): Promise<User | null> ;
}

export default UserRepository;
