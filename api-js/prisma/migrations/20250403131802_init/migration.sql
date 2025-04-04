-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT 'products',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_products" ("category", "createdAt", "description", "id", "image", "price", "stock", "title") SELECT "category", "createdAt", "description", "id", "image", "price", "stock", "title" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
