import { MigrationInterface, QueryRunner } from 'typeorm'
import OperationSchema from '../schemas/OperationSchema';
import { initialOperations } from '../initialData/operations';

export class AddOperations1683410895769 implements MigrationInterface {
    name = 'AddOperations1683410895769';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(OperationSchema)
          .values(initialOperations)
          .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from(OperationSchema)
          .execute();
    }

}
