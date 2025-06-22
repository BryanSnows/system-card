import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCardEndClientsTable1750628350904 implements MigrationInterface {
    name = 'CreateCardEndClientsTable1750628350904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cards_flag_enum" AS ENUM('VISA', 'MASTERCARD', 'ELO')`);
        await queryRunner.query(`CREATE TYPE "public"."cards_type_enum" AS ENUM('DEBITO', 'CREDITO')`);
        await queryRunner.query(`CREATE TYPE "public"."cards_status_enum" AS ENUM('SOLICITADO', 'APROVADO', 'ENTREGUE', 'ATIVO', 'BLOQUEADO_TEMPORARIO', 'BLOQUEADO_PERDA_ROUBO', 'CANCELADO')`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "card_holder_name" character varying NOT NULL, "flag" "public"."cards_flag_enum" NOT NULL, "type" "public"."cards_type_enum" NOT NULL, "cvv" character varying NOT NULL, "expiration_date" character varying NOT NULL, "limit" numeric(10,2), "status" "public"."cards_status_enum" NOT NULL DEFAULT 'SOLICITADO', "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" uuid, CONSTRAINT "UQ_5deec73c016e2940ce4ced835e2" UNIQUE ("number"), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "birth_date" date NOT NULL, "cpf" character varying NOT NULL, "monthly_income" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4245ac34add1ceeb505efc98777" UNIQUE ("cpf"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_5b97b8ec810b2e73fa4127749f7" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_5b97b8ec810b2e73fa4127749f7"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TYPE "public"."cards_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cards_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cards_flag_enum"`);
    }

}
