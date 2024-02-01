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

export type SchemaDataTypes = 'string' | 'number' | 'boolean' | 'array' | 'object'

export type ObjectSchema = {
    type: "object"
    properties: Schema
}

export type ArraySchema = {
    type: "array"
    properties: Schema
}

export type Schema = ObjectSchema | ArraySchema | {
    type: 'string' | 'number' | 'boolean'
    format?: string
    nullable?: boolean
}

export type BaseResponseSchema = Schema

export type JwtPayload = {
    user_id: number
}