import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterAddressEmployeeService } from "@/services/employees/register-address-employee";

export function makeRegisterAddressEmployeeService() {
  const employeesRepository = new PrismaEmployeesRepository();
  return new RegisterAddressEmployeeService(employeesRepository);
}
