/*
  Warnings:

  - You are about to drop the `ContentSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContentSection";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PageSections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,
    "preview_image" TEXT,
    "custom_fields" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_PageSections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PageSections_A_fkey" FOREIGN KEY ("A") REFERENCES "PageSections" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PageSections_B_fkey" FOREIGN KEY ("B") REFERENCES "Pages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageSections_AB_unique" ON "_PageSections"("A", "B");

-- CreateIndex
CREATE INDEX "_PageSections_B_index" ON "_PageSections"("B");
