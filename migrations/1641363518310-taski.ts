import {MigrationInterface, QueryRunner} from "typeorm";

export class taski1641363518310 implements MigrationInterface {
    name = 'taski1641363518310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`process\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`active\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`panic_process_data\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`panic_process_data\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`panic_process_data\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`panic_process_data\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`active\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`process\` tinyint NOT NULL DEFAULT '0'`);
    }

}
