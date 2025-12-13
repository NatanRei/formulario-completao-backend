import { Employee, Prisma } from "@prisma/client";

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>;
  getAll(): Promise<Employee[]>;
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>;
  update(id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee>;
  createBase(data: Prisma.EmployeeCreateInput): Promise<Employee>;
  createAddress(
    employeeId: string,
    data: Prisma.AddressCreateInput
  ): Promise<void>;
  createContact(
    employeeId: string,
    data: Prisma.ContactCreateInput
  ): Promise<void>;
  createBanks(data: Prisma.BankCreateManyArgs): Promise<void>;
  createFiles(data: Prisma.FileCreateManyArgs): Promise<void>;
}
