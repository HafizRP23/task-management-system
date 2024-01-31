import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1706672664831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_rules (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_roles (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(25) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(50) NOT NULL,
                profile_img VARCHAR(50),
                role_id INT NOT NULL,
                is_active TINYINT(1) DEFAULT 1,
                FOREIGN KEY (role_id) REFERENCES user_roles(id)
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                content TEXT,
                last_updated INT NOT NULL,
                created_at INT NOT NULL,
                created_by INT,
                is_shared TINYINT(1) DEFAULT 0,
                nofified_on INT DEFAULT 0,
                FOREIGN KEY (created_by) REFERENCES users(id)
            )
        `)

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_roles_rules (
                role_id INT NOT NULL,
                rule_id INT NOT NULL,
                FOREIGN KEY (role_id) REFERENCES user_roles(id),
                FOREIGN KEY (rule_id) REFERENCES user_rules(id)
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS user_roles_rules;
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS tasks;
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS users;
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS user_roles;
        `);

        await queryRunner.query(`
            DROP TABLE IF EXISTS user_rules;
        `);
    }

}