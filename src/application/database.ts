import fastifyPlugin from "fastify-plugin";
import InfraDB from "../infrastructure/database";

export default fastifyPlugin(async () => {
    const mainDataSource = InfraDB.addDataSource({
        name: "main",
        config: {
            type: "mysql",
            username: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        }
    })

    await mainDataSource.initialize()
})