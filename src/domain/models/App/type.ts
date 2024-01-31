import * as z from "zod"
import { envSchema } from "./schema"
import { DataSourceOptions } from "typeorm"

export type EnvSchema = z.infer<typeof envSchema>

export type AddDataSourceParams = {
    name: string
    config: DataSourceOptions
}

export type ValidatePassword = {
    hash: string
    password: string
}