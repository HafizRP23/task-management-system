import * as yup from "yup"

export const registerRequest = yup.object({
    email: yup.string().email().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    password: yup.string().required(),
    profile_img: yup.string().optional()
})

export const loginRequest = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})