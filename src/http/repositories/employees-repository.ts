import { Prisma, Employee } from "@prisma/client";

export interface EmployeesRepository {
  findById(id: string): Promise<Employee | null>;
  getAll(): Promise<Employee[]>;
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>;
}