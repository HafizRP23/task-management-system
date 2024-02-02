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
            components: {
                securitySchemes: {
                    authorization: {
                        type: "apiKey",
                        name: "authorization",
                        in: "header",
                        description: "Token for accessing endpoint"
                    }
                }
            }
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