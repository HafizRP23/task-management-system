import { CreateTaskServiceApp, createTaskRequest } from "../../domain/models/Task";
import { CreateTaskDomain } from "../../domain/services/Task";

export async function CreateTaskServiceApp({ content, created_by, title, is_shared, notified_on }: CreateTaskServiceApp) {
    await createTaskRequest.validate({ content, created_by, title, is_shared })

    await CreateTaskDomain({ content, created_by, title, is_shared, notified_on })

    return true
}