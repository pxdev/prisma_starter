import { prisma } from "~~/db";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!Array.isArray(body)) {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid input: expected an array of menu items"
            });
        }

        await prisma.$transaction(async (tx) => {
            // Get all existing menu items
            const existingItems = await tx.menu.findMany();
            const existingIds = new Set(existingItems.map(item => item.id));

            // Process each item in the body
            for (let i = 0; i < body.length; i++) {
                const item = body[i];
                const { id, children, ...itemData } = item;

                if (existingIds.has(id)) {
                    // Update existing item
                    await tx.menu.update({
                        where: { id },
                        data: {
                            ...itemData,
                            order: i,
                            parent_id: null // Reset parent_id for top-level items
                        }
                    });
                    existingIds.delete(id);
                } else {
                    // Create new item
                    await tx.menu.create({
                        data: {
                            ...itemData,
                            id, // Preserve the ID from the client
                            order: i,
                            parent_id: null
                        }
                    });
                }

                // Process children
                if (children && Array.isArray(children)) {
                    for (let j = 0; j < children.length; j++) {
                        const child = children[j];
                        const { id: childId, ...childData } = child;

                        if (existingIds.has(childId)) {
                            // Update existing child
                            await tx.menu.update({
                                where: { id: childId },
                                data: {
                                    ...childData,
                                    order: j,
                                    parent_id: id
                                }
                            });
                            existingIds.delete(childId);
                        } else {
                            // Create new child
                            await tx.menu.create({
                                data: {
                                    ...childData,
                                    id: childId, // Preserve the ID from the client
                                    order: j,
                                    parent_id: id
                                }
                            });
                        }
                    }
                }
            }

            // Delete items that no longer exist in the new structure
            if (existingIds.size > 0) {
                await tx.menu.deleteMany({
                    where: {
                        id: {
                            in: Array.from(existingIds)
                        }
                    }
                });
            }
        });

        return {
            statusCode: 200,
            statusMessage: "Successfully updated Menu data"
        };
    } catch (error) {
        console.error("Error updating Menu data:", error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || "Error updating Menu data",
            data: error
        });
    }
});