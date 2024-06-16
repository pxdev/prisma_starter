-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PageSections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "component_name" TEXT NOT NULL DEFAULT 'DefaultComponent',
    "body" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "preview_image" TEXT,
    "custom_fields" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_PageSections" ("body", "created_at", "custom_fields", "display_order", "id", "preview_image", "title", "updated_at") SELECT "body", "created_at", "custom_fields", "display_order", "id", "preview_image", "title", "updated_at" FROM "PageSections";
DROP TABLE "PageSections";
ALTER TABLE "new_PageSections" RENAME TO "PageSections";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
