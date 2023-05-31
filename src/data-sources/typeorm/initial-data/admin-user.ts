import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '@entities';
import UserType from '@core/enums/UserType';

export const adminUser: QueryDeepPartialEntity<User> = {
  username: 'admin@admin.com',
  password: '$2a$10$IXo3xBlMTDIgj89zrKpoP.TIXtlbZgFEYClBvcLsLRSUTnfjX/QKS',
  type: UserType.ADMIN
}
