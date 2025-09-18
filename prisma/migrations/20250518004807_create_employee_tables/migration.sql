-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization_uuid" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "phoneId" TEXT NOT NULL,
    "detailsId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Employee_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "EmployeeDetails" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zipCode" TEXT NOT NULL,
    "publicPlace" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telephoneNumber" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bankCode" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "accountDigit" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "keyPix" TEXT,
    "default" BOOLEAN NOT NULL,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "Bank_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "is_persistent" BOOLEAN,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "File_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmployeeDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "birthDate" DATETIME NOT NULL,
    "motherName" TEXT NOT NULL,
    "general_registration_type" TEXT NOT NULL,
    "general_registration_number" TEXT NOT NULL,
    "general_registration_organ" TEXT NOT NULL,
    "general_registration_state" TEXT NOT NULL,
    "general_registration_emission" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "naturalness" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_addressId_key" ON "Employee"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phoneId_key" ON "Employee"("phoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_detailsId_key" ON "Employee"("detailsId");

-- CreateIndex
CREATE UNIQUE INDEX "File_uuid_key" ON "File"("uuid");
