import { prisma } from "~~/db";
import { defineEventHandler, createError, sendError, getQuery } from "h3";

const moduleName = "Categories";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "PATCH");

    const query = getQuery(event);
    const id = query.id as string;

    const { name, icon, mediaId } = await readBody(event);

    if (!id) {
      const err = createError({
        statusCode: 400,
        statusMessage: `${moduleName} ID is required`,
      });
      sendError(event, err);
      return;
    }

    const media = await prisma.itemCategory.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    if (!media) {
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
      statusMessage: `Successfully Updated ${moduleName} data`,
      data: media,
    };
  } catch (error) {
    // Handle any errors
    console.error(error);
    const err = createError({
      statusCode: 500,
      statusMessage: `Error Updating ${moduleName} data`,
      data: error,
    });
    sendError(event, err);
  } finally {
    prisma.$disconnect();
  }
});
