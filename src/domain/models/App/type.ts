import * as yup from "yup"

import { envSchema } from "./schema"
import { DataSourceOptions } from "typeorm"

export type EnvSchema = yup.InferType<typeof envSchema>

export type AddDataSourceParams = {
    name: string
    config: DataSourceOptions
}

export type ValidatePassword = {
    hash: string
    password: string
}

export type BaseSchema = {
    type: 'string' | 'number' | 'boolean' | "file"
    format ?: string
    nullable ?: boolean
}

export type ObjectSchema<T> = {
    type: "object"
    properties: Record<keyof T, BaseSchema>
}

export type ArraySchema<T> = {
    type: "array"
    items: Record<keyof T, BaseSchema>
}

export type BaseResponseSchema<T> = ObjectSchema<T> | ArraySchema<T> | BaseSchema

export type JwtPayload = {
    user_id: number
}