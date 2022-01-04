import {MigrationInterface, QueryRunner} from "typeorm";

export class kk1641302705137 implements MigrationInterface {
    name = 'kk1641302705137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` ADD \`token_price_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD UNIQUE INDEX \`IDX_ebfce529a9ee935bd4e2506c3b\` (\`token_price_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ebfce529a9ee935bd4e2506c3b\` ON \`token\` (\`token_price_id\`)`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`fk_68e5fd216264968da81aee5b1b0f675f\` FOREIGN KEY (\`token_price_id\`) REFERENCES \`token_price\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`fk_68e5fd216264968da81aee5b1b0f675f\``);
        await queryRunner.query(`DROP INDEX \`REL_ebfce529a9ee935bd4e2506c3b\` ON \`token\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP INDEX \`IDX_ebfce529a9ee935bd4e2506c3b\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP COLUMN \`token_price_id\``);
    }

}
