import fastifyPlugin from "fastify-plugin"
import AdminRoutes from "../adapter/inbound/http/routes/Admin"
import StaffRoutes from "../adapter/inbound/http/routes/Staff"

export default fastifyPlugin(async(server) => {
    await server.register(AdminRoutes)
    await server.register(StaffRoutes)
})