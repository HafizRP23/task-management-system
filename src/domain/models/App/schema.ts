import * as z from "zod"

export const envSchema = z.object({
    NODE_ENV: z.enum(["development", "testing", "production"]),
    NODE_PORT: z.preprocess(val => parseInt(val as string), z.number()),
    NODE_HOST: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z.preprocess(val => parseInt(val as string), z.number()),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string()
})