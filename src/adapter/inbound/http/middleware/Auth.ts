import { FastifyRequest } from "fastify";
import { UnathorizedError } from "../../../../infrastructure/error";
import * as Jwt from "../../../../utils/jwt";
import { CheckUserExistDomain } from "../../../../domain/services/User";
import { User } from "../../../../domain/models/User";

declare module "fastify" {
    interface FastifyRequest {
        user: User
    }
}

export async function CheckAuth(request: FastifyRequest) {
    const token = request.headers.authorization

    // Check token exist
    if(!token) {
        throw new UnathorizedError("TOKEN_NOT_FOUND")
    }

    // Check claims is valid
    const claims = await Jwt.verify(token)

    const user = await CheckUserExistDomain(claims.user_id)

    console.log(user)

    // Check user claims is valid
    request.user = user
}