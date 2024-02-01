import { DBCreateUser, DBGetUserByEmail, DBGetUserById } from "../../adapter/outbound/repository/User";
import { NotFoundError, RequestError, ServerError } from "../../infrastructure/error";
import { CreateUserRepository } from "../models/User";

export async function CheckUserExistDomain(user_id: number) {
    const result = await DBGetUserById(user_id)

    if(result.length < 1) {
        throw new NotFoundError("USER_NOT_FOUND")
    }

    return result[0]
}

export async function CheckEmailAvailableDomain(email: string) {
    const result = await DBGetUserByEmail(email)

    if(result.length) {
        throw new RequestError("EMAIL_ALREADY_USED")
    }

    return true
}

export async function CheckUserExistByEmailDomain(email: string) {
    const result = await DBGetUserByEmail(email)

    if(result.length < 1) {
        throw new NotFoundError("USER_NOT_FOUND")
    }

    return result[0]
}

export async function CreateUserDomain(values: CreateUserRepository) {
    const result = await DBCreateUser(values)

    if(result.affectedRows < 1) {
        throw new ServerError("FAILED_TO_REGISTER")
    }

    return result
}