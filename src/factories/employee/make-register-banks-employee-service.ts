import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterBanksEmployeeService } from "@/services/employees/register-banks-employee";

export function makeRegisterBanksEmployeeService() {
  const employeesRepository = new PrismaEmployeesRepository();
  return new RegisterBanksEmployeeService(employeesRepository);
}
