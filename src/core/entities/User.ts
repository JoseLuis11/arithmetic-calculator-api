import Entity from './Entity';
import UserStatus from '../enums/UserStatus';
import UserType from '@core/enums/UserType';

interface User extends Entity {
  username: string;
  password: string;
  type?: UserType;
  balance?: number;
  status?: UserStatus
}

export default User;
