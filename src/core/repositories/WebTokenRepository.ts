import { User } from '@entities';
import TokenUser from '../types/TokenUser';

interface WebTokenRepository {
  sign(user: User): string;
  verify(token: string): TokenUser;
}

export default WebTokenRepository;
