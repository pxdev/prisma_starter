import { prisma } from '~~/db'
import { defineEventHandler, createError, sendError } from 'h3'

const moduleName = 'Pages'

export default defineEventHandler(async (event) => {
    try {
        // Get the data ID from the query parameters
        const { id } = event.context.params as { id: string }

        if (!id) {
            const err = createError({
                statusCode: 400,
                statusMessage: `${moduleName} ID is required`,
            })
            sendError(event, err)
            return
        }

        // Fetch the data by ID
        const item = await prisma.pages.findUnique({
            where: { slug:id },
            include:{
                page_sections: true

            }
        })

        if (!item) {
            const err = createError({
                statusCode: 404,
                statusMessage: `${moduleName} not found`,
            })
            sendError(event, err)
            return
        }

        // Return the data
        return {
            statusCode: 200,
            statusMessage: `Successfully fetched ${moduleName} data`,
            data: item,
        }
    } catch (error) {
        // Handle any errors
        console.error(error)
        const err = createError({
            statusCode: 500,
            statusMessage: `Error fetching ${moduleName} data`,
            data: error,
        })
        sendError(event, err)
    }
})
