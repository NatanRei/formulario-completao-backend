import { Employee } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { EmployeesRepository } from "@/http/repositories/employees-repository";

interface GetEmployeeProfileServiceRequest {
    employeeId: string
}

interface GetEmployeeProfileServiceResponse {
    employee: Employee
}

export class GetEmployeeProfileService {
    constructor(
        private employeesRepository: EmployeesRepository
    ) {}

    async execute({ employeeId }: GetEmployeeProfileServiceRequest): Promise<GetEmployeeProfileServiceResponse> {
        const employee = await this.employeesRepository.findById(employeeId)

        if (!employee) {
            throw new ResourceNotFoundError();
        }
        return {
            employee
        }
    }
}