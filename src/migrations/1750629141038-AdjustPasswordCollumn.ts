import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustPasswordCollumn1750629141038 implements MigrationInterface {
    name = 'AdjustPasswordCollumn1750629141038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "password" SET NOT NULL`);
    }

}
