import Entity from './Entity';
import UserStatus from '../enums/UserStatus';

interface User extends Entity{
  userName: string;
  password: string;
  status: UserStatus
}

export default User;
