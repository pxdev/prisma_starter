import { prisma } from '~~/db'
import { defineEventHandler, getQuery, H3Error, createError, sendError } from 'h3'

const moduleName = 'Media'

export default defineEventHandler(async (event) => {
    try {
        const { user_id } = await readBody(event)

        // Get the query parameters for pagination
        const query = getQuery(event)
        const page = parseInt(query.page as string) || 1
        const limit = parseInt(query.limit as string) || 10
        const skip = (page - 1) * limit

        // Fetch the total count
        const total = await prisma.media.count()

        // Fetch with pagination
        const module = await prisma.media.findMany({
            skip: page ? skip : undefined,
            take: page ? limit : undefined,
            orderBy: {
                created_at: 'desc',
            },
            where: {
                user_id: user_id,
            },
            include: {
                item: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        })

        // Calculate total page
        const totalPages = Math.ceil(total / limit)

        // Return the items and pagination details as JSON response
        return {
            statusCode: 200,
            statusMessage: `Successfully fetched ${moduleName} data`,
            data: {
                module,
                totalPages,
                total,
                currentPage: page,
                limit,
            },
        }
    } catch (error) {
        console.error(error)
        const err = createError({
            statusCode: 500,
            statusMessage: `Error fetching ${moduleName} data`,
            data: error,
        })
        sendError(event, err)
    }
})
