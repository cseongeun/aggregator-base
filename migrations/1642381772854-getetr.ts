import {MigrationInterface, QueryRunner} from "typeorm";

export class getetr1642381772854 implements MigrationInterface {
    name = 'getetr1642381772854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_price\` DROP FOREIGN KEY \`fk_b6219756a6cc3d7d74439f476b6b111e\``);
        await queryRunner.query(`DROP INDEX \`REL_cd060cfc0599a02dc0700e974a\` ON \`token_price\``);
        await queryRunner.query(`ALTER TABLE \`token_price\` DROP COLUMN \`token_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_price\` ADD \`token_id\` bigint NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_cd060cfc0599a02dc0700e974a\` ON \`token_price\` (\`token_id\`)`);
        await queryRunner.query(`ALTER TABLE \`token_price\` ADD CONSTRAINT \`fk_b6219756a6cc3d7d74439f476b6b111e\` FOREIGN KEY (\`token_id\`) REFERENCES \`token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
