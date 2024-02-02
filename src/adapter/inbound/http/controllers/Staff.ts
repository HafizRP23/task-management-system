import { FastifyRequest } from "fastify"
import InfraDB from "../../../../infrastructure/database"
import * as UserDto from "../../../../domain/models/User/type"
import { LoginServiceApp, RegisterServiceApp } from "../../../../application/services/User"
import * as TaskService from "../../../../application/services/Task"

import * as TaskDto from "../../../../domain/models/Task"

export async function UserController() {
    return "Hello World"
}

export async function GetDataSourcesHandler() {
    const datasources = []

    for (const data in InfraDB.getDataSources()) {
        const datasource = InfraDB.getDataSource(data)
        datasources.push({ name: data, status: datasource.isInitialized })
    }

    return datasources
}

export async function RegisterHandler(request: FastifyRequest) {
    try {
        const body = request.body as UserDto.RegisterRequest
        const message = await RegisterServiceApp(body)

        return { message }

    } catch (error) {
        throw error
    }
}

export async function LoginHandler(request: FastifyRequest) {
    try {
        const body = request.body as UserDto.LoginRequest
        const message = await LoginServiceApp(body)

        return { message }
    } catch (error) {
        throw error
    }
}

export async function CreateTaskHandler(request: FastifyRequest) {
    try {
        const { id } = request.user
        const { content, title, is_shared, notified_on } = request.body as TaskDto.CreateTaskRequest
        const message = await TaskService.CreateTaskServiceApp({ content, created_by: id, notified_on, title, is_shared })

        return { message }
    } catch (error) {
        console.log(error)
        throw error   
    }
}