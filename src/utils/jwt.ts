import jwt from "jsonwebtoken"
import { JwtPayload } from "../domain/models/App"

export function sign(payload: JwtPayload) {
    return jwt.sign(payload, process.env.JWT_KEY)
}