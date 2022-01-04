import {MigrationInterface, QueryRunner} from "typeorm";

export class task1641294735114 implements MigrationInterface {
    name = 'task1641294735114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`error\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`panic\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`process\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`latest_elapsed_second\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`latest_elapsed_second\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`process\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`panic\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`error\` tinyint NOT NULL DEFAULT '0'`);
    }

}
