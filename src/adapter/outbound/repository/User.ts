import { ResultSetHeader } from "mysql2"
import { CreateUserRepository, User } from "../../../domain/models/User/type"
import dataSource from "../../../infrastructure/database"

export async function DBGetUserList() {
    const db = dataSource.getDataSource()
    return db.query(`SELECT * FROM users`)
}

export async function DBGetUserById(user_id: number) {
    const db = dataSource.getDataSource()
    return db.query<User[]>(`SELECT * FROM users WHERE id = ?`, [user_id])
}

export async function DBGetUserByEmail(email: string) {
    const db = dataSource.getDataSource()
    return db.query<User[]>(`SELECT * FROM users WHERE email = ?`, [email])
}

export async function DBCreateUser({ email, first_name, last_name, password, profile_img }: CreateUserRepository) {
    const values = [
        [email, first_name, last_name, password, profile_img, 4]
    ]

    const db = dataSource.getDataSource()

    const query = await db.query<ResultSetHeader>(`INSERT INTO users (email, first_name, last_name, password, profile_img, role_id) VALUES ?`, [values])
    return query
}