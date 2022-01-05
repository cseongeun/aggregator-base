import {MigrationInterface, QueryRunner} from "typeorm";

export class panicprocessdata1641363250933 implements MigrationInterface {
    name = 'panicprocessdata1641363250933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`panic_process_data\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`panic_process_data\``);
    }

}
