import { prisma } from "~~/db";
import { defineEventHandler, createError, sendError } from "h3";

const moduleName = "Categories";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "GET");

    const module = await prisma.itemCategory.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return {
      statusCode: 200,
      statusMessage: `Successfully fetched ${moduleName} data`,
      data: {
        module,
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
