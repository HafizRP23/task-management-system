import { LoginServiceApp, RegisterServiceApp, loginRequest, registerRequest } from "../../domain/models/User";
import { CheckEmailAvailableDomain, CheckUserExistByEmailDomain, CreateUserDomain } from "../../domain/services/User";
import { RequestError } from "../../infrastructure/error";
import * as Jwt from "../../utils/jwt";
import * as Hash from "../../utils/password";

export async function RegisterServiceApp({ email, first_name, last_name, password, profile_img }: RegisterServiceApp) {
    await registerRequest.validate({ email, first_name, last_name, password, profile_img })

    // Check email exists
    await CheckEmailAvailableDomain(email)

    const hash = await Hash.hash(password)

    // Create a new user
    await CreateUserDomain({ email, first_name, last_name, password: hash, profile_img })

    return true
}

export async function LoginServiceApp({ email, password }: LoginServiceApp) {
    await loginRequest.validate({ email, password })

    // Check user exist by email
    const user = await CheckUserExistByEmailDomain(email)

    // Check password is valid
    const checkPass = await Hash.validate({ hash: user.password, password })

    if (!checkPass) {
        throw new RequestError('INVALID_PASSWORD')
    }

    // Create access token
    const token = Jwt.sign({ user_id: user.id })

    return token
}