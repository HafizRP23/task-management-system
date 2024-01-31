import { RouteOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { GetDataSourcesHandler, UserController } from "../controllers/User";


const routes: RouteOptions[] = [
    {
        url: "/",
        method: ["GET"],
        handler: UserController
    },
    {
        url: "/datasources",
        method: ['GET'],
        schema: {
            tags: ["Admin Services"],
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            status: {
                                type: "boolean"
                            }
                        }
                    }
                }
            }
        },
        handler: GetDataSourcesHandler
    }
]

export default fastifyPlugin(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})