import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1684256985878 implements MigrationInterface {
    name = 'CreateUserTable1684256985878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TYPE "public"."user_type_enum" 
                AS ENUM('user', 'admin')`);
        await queryRunner.query(
          `CREATE TYPE "public"."user_status_enum" 
                AS ENUM('active', 'inactive')`);
        await queryRunner.query(
          `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "username" character varying NOT NULL, 
                "password" character varying NOT NULL, 
                "type" "public"."user_type_enum" NOT NULL DEFAULT 'user', 
                "balance" double precision NOT NULL DEFAULT '5000', 
                "status" "public"."user_status_enum" NOT NULL DEFAULT 'active', 
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), 
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"');
        await queryRunner.query('DROP TYPE "public"."user_status_enum"');
        await queryRunner.query('DROP TYPE "public"."user_type_enum"');
    }

}
