import { ZodError } from "zod";
import { EnvSchema, envSchema } from "../domain/models/App";

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvSchema { }
    }
}

class InfrastructureConfig {
    async validate(env: EnvSchema) {
        try {
            await envSchema.parseAsync(env)
        } catch (error) {
            if(error instanceof ZodError) {
                const { code, path, message } = error.issues[0]
                throw new Error(`${code} ${path[0]}: ${message}`)
            }
        }
    }
}


export default new InfrastructureConfig()