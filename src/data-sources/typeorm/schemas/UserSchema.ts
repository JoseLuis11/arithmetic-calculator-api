import { EntitySchema } from 'typeorm';
import { User } from '@entities';
import UserStatus from '@core/enums/UserStatus';
import UserType from '@core/enums/UserType';
import accessEnv from '@utils/accessEnv';
import dotenv from 'dotenv';

dotenv.config();

const UserSchema = new EntitySchema<User>({
  name: 'User',
  columns: {
    id: {
      type: 'string',
      primary: true,
      generated: 'uuid'
    },
    username: {
      type: 'character varying',
      unique: true
    },
    password: {
      type: 'character varying'
    },
    type: {
      type: 'enum',
      enum: UserType,
      default: UserType.USER
    },
    balance: {
      type: 'float',
      default: accessEnv('USER_STARTING_BALANCE')
    },
    status: {
      type: 'enum',
      enum: UserStatus,
      default: UserStatus.ACTIVE
    }
  },
});

export default UserSchema;
