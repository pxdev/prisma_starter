/*
  Warnings:

  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PropertyToPropertyType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `property_id` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `is_property_owner` on the `User` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_PropertyToPropertyType_B_index";

-- DropIndex
DROP INDEX "_PropertyToPropertyType_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Property";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PropertyType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PropertyToPropertyType";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "bedroom_count" INTEGER NOT NULL,
    "bathroom_count" INTEGER NOT NULL,
    "size" REAL NOT NULL,
    "fixtures" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "for_sale" BOOLEAN NOT NULL DEFAULT true,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "Items_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemsCategories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemsToItemsCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ItemsToItemsCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ItemsToItemsCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemsCategories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bookmark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bookmark_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("created_at", "id", "user_id") SELECT "created_at", "id", "user_id" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "item_id" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Media_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("created_at", "id", "name", "path", "user_id") SELECT "created_at", "id", "name", "path", "user_id" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "last_login_ip_address" TEXT NOT NULL,
    "current_logged_in_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_logged_in_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_item_owner" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("created_at", "current_logged_in_at", "email", "id", "is_admin", "last_logged_in_at", "last_login_ip_address", "name", "password", "phone", "salt", "surname") SELECT "created_at", "current_logged_in_at", "email", "id", "is_admin", "last_logged_in_at", "last_login_ip_address", "name", "password", "phone", "salt", "surname" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check("Bookmark");
PRAGMA foreign_key_check("Media");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ItemsToItemsCategories_AB_unique" ON "_ItemsToItemsCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemsToItemsCategories_B_index" ON "_ItemsToItemsCategories"("B");
