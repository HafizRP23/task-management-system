import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTypoAndColumnDefaultValue1706870197770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE tasks CHANGE COLUMN nofified_on notified_on INT DEFAULT 0`)

        await queryRunner.query(`ALTER TABLE tasks MODIFY last_updated INT DEFAULT 0`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
