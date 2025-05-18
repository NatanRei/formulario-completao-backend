-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "taxid_number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization_uuid" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
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
    "zip_code" TEXT NOT NULL,
    "public_place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "federal_unit" TEXT NOT NULL,
    "country_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telephone_number" TEXT NOT NULL,
    "country_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bank_ispb" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "account_digit" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "key_pix" TEXT,
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
    "mime_type" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "is_persistent" BOOLEAN,
    "employeeId" TEXT NOT NULL,
    CONSTRAINT "File_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmployeeDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "birth_date" DATETIME NOT NULL,
    "mother_name" TEXT NOT NULL,
    "general_registration_type" TEXT NOT NULL,
    "general_registration_number" TEXT NOT NULL,
    "general_registration_organ" TEXT NOT NULL,
    "general_registration_federal_unit" TEXT NOT NULL,
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
