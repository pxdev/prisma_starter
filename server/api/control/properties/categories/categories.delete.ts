import { prisma } from "~~/db";
import { defineEventHandler, createError, sendError, getQuery } from "h3";

const moduleName = "Categories";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "DELETE");

    const query = getQuery(event);
    const id = query.id as string;

    // Get the ID from the query parameters

    if (!id) {
      const err = createError({
        statusCode: 400,
        statusMessage: `${moduleName} ID is required`,
      });
      sendError(event, err);
      return;
    }

    const item = await prisma.itemCategory.delete({
      where: { id },
    });

    if (!item) {
      const err = createError({
        statusCode: 404,
        statusMessage: `${moduleName} not found`,
      });
      sendError(event, err);
      return;
    }

    // Return the data
    return {
      statusCode: 200,
      statusMessage: `Successfully Deleted ${moduleName} data`,
      data: item,
    };
  } catch (error) {
    // Handle any errors
    console.error(error);
    const err = createError({
      statusCode: 500,
      statusMessage: `Error Deleting ${moduleName} data`,
      data: error,
    });
    sendError(event, err);
  }
});
