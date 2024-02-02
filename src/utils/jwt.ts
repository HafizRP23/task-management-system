import jwt from "jsonwebtoken"
import { JwtPayload } from "../domain/models/App"
import { UnathorizedError } from "../infrastructure/error"

export function sign(payload: JwtPayload) {
    return jwt.sign(payload, process.env.JWT_KEY)
}

export function verify(token: string) {
    return new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, undefined, (error, decoded) => {
            if (error) {
                reject(new UnathorizedError(error.name))
            } else {
                resolve(decoded as JwtPayload)
            }
        })
    })
}