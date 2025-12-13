import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterFilesEmployeeService } from "@/services/employees/register-files-employee";

export function makeRegisterFilesEmployeeService() {
  const employeesRepository = new PrismaEmployeesRepository();
  return new RegisterFilesEmployeeService(employeesRepository);
}
