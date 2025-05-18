import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { RegisterEmployeeService } from "../register-employee";

export function makeRegisterEmployeeService() {
    const employeesRepository = new PrismaEmployeesRepository()
    return new RegisterEmployeeService(employeesRepository)
}