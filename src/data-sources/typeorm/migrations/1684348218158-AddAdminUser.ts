import { MigrationInterface, QueryRunner } from 'typeorm'
import UserSchema from '../schemas/UserSchema';
import { adminUser } from '../initial-data/admin-user';

export class AddAdminUser1684347901046 implements MigrationInterface {
    name = 'AddAdminUser1684347901046';
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(UserSchema)
          .values(adminUser)
          .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from(UserSchema)
          .where({ username: adminUser.username })
          .execute()
    }

}
