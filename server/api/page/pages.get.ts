import { prisma } from "~~/db";
import {
  defineEventHandler,
  getQuery,
  H3Error,
  createError,
  sendError,
} from "h3";

const moduleName = "Pages";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "GET");

    // Get the query parameters for pagination
    const query = getQuery(event);
    const search = query.search as string;

    // Fetch the total count
    const total = await prisma.page.count();

    // Fetch the items based on the query parameters
    const module = await prisma.page.findMany({
      orderBy: {
        created_at: "asc",
      },
      where: {
        status: "PUBLISHED",
        title: {
          contains: search,
        },
      },
    });

    // Calculate total page

    // Return the data and pagination details as JSON response
    return {
      statusCode: 200,
      statusMessage: `Successfully fetched ${moduleName} data`,
      data: {
        module,
        total,
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
  }
});
