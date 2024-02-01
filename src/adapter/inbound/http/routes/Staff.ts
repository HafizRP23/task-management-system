import { RouteOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { LoginHandler, RegisterHandler } from "../controllers/User";


const routes: RouteOptions[] = [
    {
        method: ["POST"],
        url: "/register",
        schema: {
            tags: ["Staff Services"],
            body: {
                type: "object",
                properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    profile_img: { type: "string" }
                }
            }
        },
        handler: RegisterHandler
    },
    {
        method: ["POST"],
        url: '/login',
        schema: {
            tags: ["Staff Services"],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    password: { type: "string" }
                }
            }
        },
        handler: LoginHandler
    }
]

export default fastifyPlugin(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})