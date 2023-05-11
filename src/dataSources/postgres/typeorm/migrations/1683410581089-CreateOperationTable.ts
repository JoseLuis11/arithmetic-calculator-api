import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOperationTable1683410581089 implements MigrationInterface {
  name = 'CreateOperationTable1683410581089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."operation_type_enum" 
      AS ENUM('addition', 'subtraction', 'multiplication', 'division', 'square_root', 'random_string')`);

    await queryRunner.query(
      'CREATE TABLE "operation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), ' +
      '"type" "public"."operation_type_enum" NOT NULL, ' +
      '"cost" double precision NOT NULL, ' +
      'CONSTRAINT "UQ_cd0195651a1f3814d39050c74f4" UNIQUE ("type"), ' +
      'CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "operation"');
    await queryRunner.query('DROP TYPE "public"."operation_type_enum"');
  }

}
