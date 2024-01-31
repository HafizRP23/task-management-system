import "dotenv/config"
import fastify from "fastify"
import routes from "./application/routes"
import swagger from "./application/swagger"
import InfrastructureConfig from "./infrastructure/config"
import database from "./application/database"
const server = fastify()

async function main() {
    try {
        await InfrastructureConfig.validate(process.env)
        await server.register(swagger)
        await server.register(routes)
        await server.register(database)

        const url = await server.listen({
            port: process.env.NODE_PORT,
            host: process.env.NODE_HOST
        })

        console.log(`App running on ${url}`)
    } catch (error) {
        console.log(error)
    }
}

main()