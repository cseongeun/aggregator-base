import {MigrationInterface, QueryRunner} from "typeorm";

export class er1641195177907 implements MigrationInterface {
    name = 'er1641195177907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheduler\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`scheduler\` ADD \`data\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheduler\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`scheduler\` ADD \`data\` text NOT NULL`);
    }

}
