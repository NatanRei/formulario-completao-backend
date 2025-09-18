/*
  Warnings:

  - You are about to drop the `EmployeeDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `detailsId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `organization_uuid` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `is_persistent` on the `File` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EmployeeDetails";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "phoneId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("addressId", "createdAt", "document", "email", "id", "name", "phoneId", "position", "salary", "sector", "startDate", "type", "updatedAt") SELECT "addressId", "createdAt", "document", "email", "id", "name", "phoneId", "position", "salary", "sector", "startDate", "type", "updatedAt" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
CREATE UNIQUE INDEX "Employee_addressId_key" ON "Employee"("addressId");
CREATE UNIQUE INDEX "Employee_phoneId_key" ON "Employee"("phoneId");
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "File_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_File" ("employeeId", "fileName", "id", "mimeType", "path", "type", "uuid") SELECT "employeeId", "fileName", "id", "mimeType", "path", "type", "uuid" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_uuid_key" ON "File"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
