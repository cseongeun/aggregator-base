import {MigrationInterface, QueryRunner} from "typeorm";

export class ii1641364615386 implements MigrationInterface {
    name = 'ii1641364615386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`panic_process_data\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`panic_process_data\` longtext NULL`);
    }

}
