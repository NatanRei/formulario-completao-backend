import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { UpdateEmployeeService } from "@/services/update-employee";

export function makeUpdateEmployeeService() {
    const employeesRepository = new PrismaEmployeesRepository()
    return new UpdateEmployeeService(employeesRepository)
}