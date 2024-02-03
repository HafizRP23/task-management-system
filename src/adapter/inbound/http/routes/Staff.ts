import { RouteOptions } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { CreateTaskHandler, LoginHandler, RegisterHandler } from "../controllers/Staff";
import * as Auth from "../middleware/Auth";
import { baseSchema } from "../../../../domain/models/App";
import { LoginRequest, RegisterRequest } from "../../../../domain/models/User";
import { CreateTaskRequest } from "../../../../domain/models/Task";


const routes: RouteOptions[] = [
    {
        method: ["POST"],
        url: "/register",
        schema: {
            tags: ["Staff Services"],
            body: baseSchema<RegisterRequest>({
                type: "object",
                properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    profile_img: { type: "string" }
                }
            })
        },
        handler: RegisterHandler
    },
    {
        method: ["POST"],
        url: '/login',
        schema: {
            tags: ["Staff Services"],
            body: baseSchema<LoginRequest>({
                type: "object",
                properties: {
                    email: { type: 'string' },
                    password: { type: "string" }
                }
            }),
            response: {
                200: baseSchema({
                    type: "object",
                    properties: {
                        message: {
                            type: "string"
                        }
                    }
                })
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
            body: baseSchema<CreateTaskRequest>({
                type: "object",
                properties: {
                    content: { type: "string" },
                    title: { type: "string" },
                    is_shared: { type: "boolean" },
                    notified_on: { type: "number" }
                }
            })
        },
        preHandler: Auth.CheckAuth,
        handler: CreateTaskHandler
    },
    {
        method: ["GET"],
        url: "/tasks",
        handler: () => "This is new"
    }
]

export default fastifyPlugin(async (server) => {
    for (const route of routes) {
        server.route({ ...route })
    }
})