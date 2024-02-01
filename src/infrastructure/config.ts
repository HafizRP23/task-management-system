import { ZodError } from "zod";
import { ValidationError }  from "yup"
import { EnvSchema, envSchema } from "../domain/models/App";
import { ServerError } from "./error";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvSchema { }
    }
}

class InfrastructureConfig {
    async validate(env: EnvSchema) {
        try {
            // await envSchema.parseAsync(env)

            await envSchema.validate(env)
        } catch (error) {
            // if(error instanceof ZodError) {
            //     const { code, path, message } = error.issues[0]
            //     throw new Error(`${code} ${path[0]}: ${message}`)
            // }

            if(error instanceof ValidationError) {
                throw new Error(error.message)
            }

        }
    }
}


export default new InfrastructureConfig()