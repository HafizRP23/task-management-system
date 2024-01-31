import * as bcrypt from "bcrypt"
import { ValidatePassword } from "../domain/models/App"

export function hash(password: string) {
    return bcrypt.hash(password, 10)
}

export function validate({ hash, password }: ValidatePassword) {
    return bcrypt.compare(password, hash)
}