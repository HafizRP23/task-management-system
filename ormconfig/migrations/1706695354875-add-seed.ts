import { hash } from "bcrypt";
import { ResultSetHeader } from "mysql2";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSeed1706695354875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Seed roles
        const roles = [
            'super_admin',
            'supervisor',
            'senior',
            'staff'
        ]

        const roles_id: Record<string, number> = {}

        for (const role of roles) {
            const result: ResultSetHeader = await queryRunner.query(`
                INSERT INTO user_roles (name) VALUES (?)
            `, [role])
            
            roles_id[role] = result.insertId
        }


        const users = [
            {
                first_name: "super",
                last_name: "admin",
                email: "superadmin@gmail.com",
                password: await hash("superadmin", 10),
                role_id: roles_id['super_admin']
            },
            {
                first_name: "Super",
                last_name: "Visor",
                email: "supervisor@gmail.com",
                password: await hash("supervisor", 10),
                role_id: roles_id['supervisor']
            },
            {
                first_name: "Senior",
                last_name: "Staff",
                email: "senior@gmail.com",
                password: await hash("senior", 10),
                role_id: roles_id['senior']
            },
            {
                first_name: "Staff",
                last_name: "Staff",
                email: "staff@gmail.com",
                password: await hash("staff", 10),
                role_id: roles_id['staff']
            }
        ]


    // Seed users
        for (const user of users) {
            const values = [
                Object.values(user)
            ]

            await queryRunner.query(`
                INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ?
            `, [values])
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
