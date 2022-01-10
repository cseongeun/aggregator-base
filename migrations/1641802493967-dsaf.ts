import {MigrationInterface, QueryRunner} from "typeorm";

export class dsaf1641802493967 implements MigrationInterface {
    name = 'dsaf1641802493967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`network\` DROP COLUMN \`http\``);
        await queryRunner.query(`ALTER TABLE \`network\` ADD \`http\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`farm\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`farm\` ADD \`data\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`lending\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`lending\` ADD \`data\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lending\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`lending\` ADD \`data\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`farm\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`farm\` ADD \`data\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`network\` DROP COLUMN \`http\``);
        await queryRunner.query(`ALTER TABLE \`network\` ADD \`http\` text NOT NULL`);
    }

}
