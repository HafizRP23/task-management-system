import * as yup from "yup"
import { loginRequest, registerRequest } from "./schema"

export type User = {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    profile_img?: string
}

export type RegisterRequest = yup.InferType<typeof registerRequest> 
export type RegisterServiceApp = RegisterRequest

export type CreateUserRepository = Omit<User, 'id'>

export type LoginRequest = yup.InferType<typeof loginRequest>
export type LoginServiceApp = LoginRequest