import { RouteOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { CreateTaskHandler, LoginHandler, RegisterHandler } from "../controllers/Staff";
import * as Auth from "../middleware/Auth";


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
    },
    {
        method: ["POST"],
        url: "/tasks",
        schema: {
            tags: ["Staff Services"],
            security: [
                {
                    authorization: []
                }
            ],
            body: {
                type: "object",
                properties: {
                    content: { type: "string" },
                    title: { type: "string" },
                    is_shared: { type: "boolean" },
                    notified_on: { type: "string" }
                }
            }
        },
        preHandler: Auth.CheckAuth,
        handler: CreateTaskHandler
    }
]

export default fastifyPlugin(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})