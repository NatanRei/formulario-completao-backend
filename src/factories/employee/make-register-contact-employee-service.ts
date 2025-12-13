import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterContactEmployeeService } from "@/services/employees/register-contact-employee";

export function makeRegisterContactEmployeeService() {
  const employeesRepository = new PrismaEmployeesRepository();
  return new RegisterContactEmployeeService(employeesRepository);
}
