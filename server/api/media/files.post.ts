import { prisma } from "~~/db";
import {
  defineEventHandler,
  getQuery,
  H3Error,
  createError,
  sendError,
} from "h3";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");

    const { files, item_id, user_id } = await readBody(event);

    if (!files || !user_id) {
      const err = createError({
        statusCode: 500,
        statusMessage: `Files or user id is missing`,
      });
      sendError(event, err);
    }

    const fileNames = [];

    for (const file of files) {
      const fileName = await storeFileLocally(file.content, 20, `/${user_id}`);
      fileNames.push(fileName);

      await prisma.media.create({
        data: {
          name: fileName,
          path: `/${user_id}/${fileName}`,
          item_id: item_id,
          user_id: user_id,
        },
      });
    }

    return {
      statusCode: 200,
      statusMessage: `Successfully created data`,
      data: fileNames,
    };
  } catch (error) {
    const err = createError({
      statusCode: 500,
      statusMessage: `Error uploading data`,
      data: error,
    });
    sendError(event, err);
  }
});
