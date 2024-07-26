import { prisma } from "~~/db";

import { defineEventHandler, createError, sendError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");

    const { name, icon, media } = await readBody(event);

    if (!name) {
      const err = createError({
        statusCode: 500,
        statusMessage: `Name is missing`,
      });
      sendError(event, err);
    }

    const category = await prisma.itemCategory.create({
      data: {
        name: name,
        icon: icon,
        media: media,
      },
    });

    return {
      statusCode: 200,
      statusMessage: `Successfully created data`,
      data: category,
    };
  } catch (error) {
    const err = createError({
      statusCode: 500,
      statusMessage: `Error creating data`,
      data: error,
    });
    sendError(event, err);
  } finally {
    prisma.$disconnect();
  }
});
