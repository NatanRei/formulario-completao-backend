import { Employee } from "@prisma/client";
import { EmployeesRepository } from "@/http/repositories/employees-repository";


interface GetEmployeesServiceResponse {
    employees: Employee[]
}

export class GetEmployeesService {
    constructor(
        private employeesRepository: EmployeesRepository
    ) {}

    async execute(): Promise<GetEmployeesServiceResponse> {
        const employees = await this.employeesRepository.getAll()

        return {
            employees
        }
    }
}