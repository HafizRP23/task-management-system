import { FastifyRequest } from "fastify"
import InfraDB from "../../../../infrastructure/database"
import * as UserDto from "../../../../domain/models/User/type"
import { LoginServiceApp, RegisterServiceApp } from "../../../../application/services/User"

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