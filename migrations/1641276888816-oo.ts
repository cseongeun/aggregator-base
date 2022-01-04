import {MigrationInterface, QueryRunner} from "typeorm";

export class oo1641276888816 implements MigrationInterface {
    name = 'oo1641276888816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`identity\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`process\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`block_number\` \`block_number\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`block_number\` \`block_number\` int NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`process\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`identity\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`type\` varchar(255) NOT NULL`);
    }

}
