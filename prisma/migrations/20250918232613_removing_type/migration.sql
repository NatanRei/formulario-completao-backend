/*
  Warnings:

  - You are about to drop the column `type` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("addressId", "birthDate", "contactId", "createdAt", "document", "id", "name", "position", "salary", "sector", "startDate", "updatedAt") SELECT "addressId", "birthDate", "contactId", "createdAt", "document", "id", "name", "position", "salary", "sector", "startDate", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_addressId_key" ON "Employee"("addressId");
CREATE UNIQUE INDEX "Employee_contactId_key" ON "Employee"("contactId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
