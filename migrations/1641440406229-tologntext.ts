import {MigrationInterface, QueryRunner} from "typeorm";

export class tologntext1641440406229 implements MigrationInterface {
    name = 'tologntext1641440406229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nf_token\` DROP COLUMN \`token_uri_data\``);
        await queryRunner.query(`ALTER TABLE \`nf_token\` ADD \`token_uri_data\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nf_token\` DROP COLUMN \`token_uri_data\``);
        await queryRunner.query(`ALTER TABLE \`nf_token\` ADD \`token_uri_data\` varchar(255) NULL`);
    }

}
