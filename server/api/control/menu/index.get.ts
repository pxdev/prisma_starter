import { prisma } from "~~/db";
import {
    defineEventHandler,
    createError,
    sendError,
} from "h3";

const moduleName = "Menu";

export default defineEventHandler(async (event) => {
    try {
        assertMethod(event, "GET");

        // Fetch the properties with pagination
        const module = await prisma.menu.findMany({
            where: {
                parent_id: null,
            },
            include: {
                children: true,
            },
        });

        // Calculate total page

        // Return the data and pagination details as JSON response
        return {
            statusCode: 200,
            statusMessage: `Successfully fetched ${moduleName} data`,
            data: {
                module
            },
        };
    } catch (error) {
        console.error(error);
        const err = createError({
            statusCode: 500,
            statusMessage: `Error fetching ${moduleName} data`,
            data: error,
        });
        sendError(event, err);
    } finally {
        prisma.$disconnect();
    }
});
