import {MigrationInterface, QueryRunner} from "typeorm";

export class task1641276725715 implements MigrationInterface {
    name = 'task1641276725715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`status\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp NULL, \`id\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`identity\` varchar(255) NOT NULL, \`cron\` varchar(255) NOT NULL, \`block_number\` int NULL DEFAULT '0', \`pid\` int NULL, \`data\` json NULL, \`error\` tinyint NOT NULL DEFAULT 0, \`process\` tinyint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
