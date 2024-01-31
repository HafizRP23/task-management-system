import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async (server) => {
    await server.register(fastifySwagger, {
        openapi: {
            info: {
                title: "TMS API",
                version: "1.0.0",
            },
        },
    })

    await server.register(fastifySwaggerUi, {
        routePrefix: "/docs",
        staticCSP: true,
        uiConfig: {
            persistAuthorization: true
        },
    })
})