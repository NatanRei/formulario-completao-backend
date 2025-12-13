import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterBaseEmployeeService } from "@/services/employees/register-base-employee";

export function makeRegisterBaseEmployeeService() {
  const employeesRepository = new PrismaEmployeesRepository();
  return new RegisterBaseEmployeeService(employeesRepository);
}
