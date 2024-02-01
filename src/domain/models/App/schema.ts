import * as yup from "yup"
import { BaseResponseSchema } from "./type"

export const envSchema = yup.object({
    NODE_ENV: yup.mixed().oneOf(["development", "testing", "production"]),
    NODE_PORT: yup.number().required(),
    NODE_HOST: yup.string().required(),
    DB_HOST: yup.string().required(),
    DB_PORT: yup.number().required(),
    DB_USERNAME: yup.string().required(),
    DB_PASSWORD: yup.string(),
    DB_DATABASE: yup.string().required(),
    JWT_KEY: yup.string().required()
})

export function baseResponse(data: BaseResponseSchema) {
    if(data.type == "string") {
        return {
            type: data.type,
        }
    }
}