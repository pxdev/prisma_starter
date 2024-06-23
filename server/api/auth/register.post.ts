import { hash } from "bcrypt"
import { prisma } from "~~/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const userExists = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    })

    if(userExists) {
        throw createError({
            statusCode: 403,
            statusMessage: "User already exists",
        })
    }

    await prisma.user.create({
        data: {
            name: body.name,
            surname: body.surname,
            password: await hash(body.password, 12),
            email: body.email,
            phone: body.phone,
            is_item_owner: body.is_item_owner,
        },
    })

    setResponseStatus(event, 201)

    return {
        success: true,
        statusMessage: `Successfully registered`,
        statusCode: 200,
    }
})
