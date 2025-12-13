import { employeeBaseSchema } from "@/http/controllers/employees/register/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";
import { Employee } from "@prisma/client";
import { z } from "zod";

type RegisterBaseEmployeeServiceRequest = z.infer<typeof employeeBaseSchema>;

interface RegisterBaseEmployeeServiceResponse {
  employee: Employee;
}

export class RegisterBaseEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    document,
    salary,
    startDate,
    birthDate,
    position,
    sector,
  }: RegisterBaseEmployeeServiceRequest): Promise<RegisterBaseEmployeeServiceResponse> {
    const employee = await this.employeesRepository.createBase({
      name,
      document,
      salary,
      startDate,
      birthDate,
      position,
      sector,
    });

    return { employee };
  }
}
