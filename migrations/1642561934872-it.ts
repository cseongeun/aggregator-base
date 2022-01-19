import {MigrationInterface, QueryRunner} from "typeorm";

export class it1642561934872 implements MigrationInterface {
    name = 'it1642561934872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`idx_interaction_3\` ON \`interaction\` (\`contract_address\`, \`address\`, \`network_id\`, \`pid\`)`);
        await queryRunner.query(`CREATE INDEX \`idx_interaction_2\` ON \`interaction\` (\`contract_address\`, \`address\`, \`network_id\`)`);
        await queryRunner.query(`CREATE INDEX \`idx_interaction_1\` ON \`interaction\` (\`address\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_interaction_1\` ON \`interaction\``);
        await queryRunner.query(`DROP INDEX \`idx_interaction_2\` ON \`interaction\``);
        await queryRunner.query(`DROP INDEX \`idx_interaction_3\` ON \`interaction\``);
    }

}
