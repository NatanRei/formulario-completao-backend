import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { GetEmployeesService } from "@/services/get-employees";

export function makeGetEmployeesService() {
    const employeesRepository = new PrismaEmployeesRepository()
    return new GetEmployeesService(employeesRepository)
}