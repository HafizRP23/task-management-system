import fastifyPlugin from "fastify-plugin"
import AdminRoutes from "../adapter/inbound/http/routes/Admin"

export default fastifyPlugin(async(server) => {
    await server.register(AdminRoutes)
})