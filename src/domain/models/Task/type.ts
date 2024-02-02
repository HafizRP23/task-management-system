import * as yup from "yup"
import { createTaskRequest } from "./schema"

export type Task = {
    id: number
    title: string
    content: string
    last_updated: number
    created_at: number
    created_by: number
    is_shared: number
    notified_on: number
}

export type CreateTaskRequest = yup.InferType<typeof createTaskRequest>
export type CreateTaskServiceApp = CreateTaskRequest & {
    created_by: number
}

export type CreateTaskRepository = Pick<Task, 'title' | 'content' | 'created_by'> & {
    is_shared?: boolean
    notified_on?: number
}