import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterEmployeeService } from "@/services/register-employee";

export function makeRegisterEmployeeService() {
    const employeesRepository = new PrismaEmployeesRepository()
    return new RegisterEmployeeService(employeesRepository)
}