import { prisma } from '~~/db'
import { defineEventHandler, getQuery, H3Error, createError, sendError } from 'h3'

const moduleName = 'Properties'

export default defineEventHandler(async (event) => {
    try {
        assertMethod(event, 'GET')

        // Get the query parameters for pagination
        const query = getQuery(event)
        const page = parseInt(query.page as string) || 1
        const limit = parseInt(query.limit as string) || 10
        const skip = (page - 1) * limit
        const search = query.search as string

        // Fetch the total count
        const total = await prisma.property.count()

        // Fetch the properties with pagination
        const module = await prisma.property.findMany({
            skip: page ? skip : undefined,
            take: page ? limit : undefined,
            orderBy: {
                created_at: 'asc',
            },
            where: {
                title: {
                    contains: search,
                },
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true,
                        phone: true,
                    },
                },
                property_type: true,
                images: true,
            },
        })

        // Calculate total pages
        const totalPages = Math.ceil(total / limit)

        // Return the data and pagination details as JSON response
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
