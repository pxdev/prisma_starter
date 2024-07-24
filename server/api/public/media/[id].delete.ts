import { prisma } from "~~/db";
import { defineEventHandler, createError, sendError, getQuery } from "h3";

const moduleName = "Media";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "DELETE");

    // Get the ID from the query parameters
    const query = getQuery(event);
    const id = query.id as string;
    const name = query.name as string;
    const user_id = query.user_id as string;

    if (!id) {
      const err = createError({
        statusCode: 400,
        statusMessage: `${moduleName} ID is required`,
      });
      sendError(event, err);
      return;
    }

    await deleteFile(name, `/${user_id}`);

    // Fetch the by ID and include owner data
    const media = await prisma.media.delete({
      where: { id },
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
      statusMessage: `Successfully Deleted ${moduleName} data`,
      data: media,
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
