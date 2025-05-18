import { PrismaEmployeesRepository } from "@/http/repositories/prisma/prisma-employees-repository";
import { GetEmployeeProfileService } from "../get-employee-profile";

export function makeGetEmployeeProfileService() {
    const employeesRepository = new PrismaEmployeesRepository()
    return new GetEmployeeProfileService(employeesRepository)
}