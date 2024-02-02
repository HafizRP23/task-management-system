import { ResultSetHeader } from "mysql2";
import { CreateTaskRepository } from "../../../domain/models/Task";
import database from "../../../infrastructure/database";

export async function DBCreateTask({ content, created_by, notified_on, title, is_shared }: CreateTaskRepository) {
    const db = database.getDataSource()
    const values = [
        [content, created_by, notified_on, title, is_shared]
    ]

    const query = await db.query<ResultSetHeader>(`INSERT INTO tasks (content, created_by, notified_on, title, is_shared) VALUES ?`, [values])

    return query
}