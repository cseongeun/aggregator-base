import {MigrationInterface, QueryRunner} from "typeorm";

export class gg1642381126252 implements MigrationInterface {
    name = 'gg1642381126252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`verify\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`verify\``);
    }

}
