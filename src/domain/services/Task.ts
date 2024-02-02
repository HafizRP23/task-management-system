import { DBCreateTask } from "../../adapter/outbound/repository/Task";
import { ServerError } from "../../infrastructure/error";
import { CreateTaskRepository } from "../models/Task";

export async function CreateTaskDomain(values: CreateTaskRepository) {
    const result = await DBCreateTask(values)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_TO_CREATE_TASK")
    }

    return result
}