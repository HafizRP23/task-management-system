import { hash } from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeed1706695354875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const roles = [
            'super_admin',
            'supervisor',
            'senior',
            'staff'
        ]

        let roles_id: Record<string, number> = {}

        for (const role of roles) {
            const result: ResultSetHeader = await queryRunner.query(`
                INSERT INTO user_rules (name) VALUES (?)
            `, [role])
            
            roles_id[role] = result.insertId
        }


        const users = [
            {
                first_name: "super",
                last_name: "admin",
                email: "superadmin@gmail.com",
                password: hash("superadmin", 10),
                role_id: roles_id['super_admin']
            },
            {
                first_name: "Super",
                last_name: "Visor",
                email: "supervisor@gmail.com",
                password: hash("supervisor", 10),
                role_id: roles_id['supervisor']
            },
            {
                first_name: "Senior",
                last_name: "Staff",
                email: "senior@gmail.com",
                password: hash("senior", 10),
                role_id: roles_id['senior']
            },
            {
                first_name: "Staff",
                last_name: "Staff",
                email: "staff@gmail.com",
                password: hash("staff", 10),
                role_id: roles_id['staff']
            }
        ]


        for (const user of users) {
            const values = [
                Object.values(user)
            ]
            await queryRunner.query(`
                INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ?
            `, [values])
        }


        // const super_admin: ResultSetHeader = await queryRunner.query(`
        //     INSERT INTO user_rules (name) VALUES (?)
        // `, ['super_admin'])

        // const supervisor: ResultSetHeader = await queryRunner.query(`
        //     INSERT INTO user_rules (name) VALUES (?)
        // `, ['supervisor'])
        
        // const senior: ResultSetHeader = await queryRunner.query(`
        //     INSERT INTO user_rules (name) VALUES (?)
        // `, ['senior'])

        // const staff: ResultSetHeader = await queryRunner.query(`
        //     INSERT INTO user_rules (name) VALUES (?)
        // `, ['staff'])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
