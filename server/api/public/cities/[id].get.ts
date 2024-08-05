import { prisma } from "~~/db";
import { defineEventHandler, createError, sendError } from "h3";

const moduleName = "Districts";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };

    assertMethod(event, "GET");

    const module = await prisma.district.findMany({
      select:{
        id: true,
        name: true,
      },
      where: {
        city_id: id,
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
