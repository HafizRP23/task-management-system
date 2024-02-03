import * as yup from "yup"

export const createTaskRequest = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    is_shared: yup.boolean().optional(),
    notified_on: yup.number().optional().min(1)
})

