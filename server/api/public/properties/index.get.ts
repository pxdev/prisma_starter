import { prisma } from "~~/db";
import {
  defineEventHandler,
  getQuery,
  H3Error,
  createError,
  sendError,
} from "h3";

const moduleName = "Properties";

export default defineEventHandler(async (event) => {
  try {
    assertMethod(event, "GET");

    // Get the query parameters for pagination
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 2;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = query.search as string;
    const type = query.type as string;
    const city = query.city as string;
    const district = query.district as string;
    const for_sale = query.for_sale as Boolean;

    // Fetch the total count
    const total = await prisma.item.count();

    // Fetch the properties with pagination
    const module = await prisma.item.findMany({
      skip: page ? skip : undefined,
      take: page ? limit : undefined,
      orderBy: {
        title: "asc",
      },
      where: {
        status: "ACTIVE",
        city: {
          contains: city,
        },
        district: {
          contains: district,
        },
        title: {
          contains: search,
        },
 
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
          },
        },
         media: {
          select: {
            id: true,
            path: true,
          },
        },
      },
    });

    // Calculate total page
    const totalPages = Math.ceil(total / limit);

    // Return the data and pagination details as JSON response
    return {
      statusCode: 200,
      statusMessage: `Successfully fetched ${moduleName} data`,
      data: {
        totalPages,
        total,
        currentPage: page,
        limit,
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
