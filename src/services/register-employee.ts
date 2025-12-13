import { registerEmployeeBodySchema } from "@/http/controllers/employees/register/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";
import { Employee } from "@prisma/client";
import { z } from "zod";

type RegisterEmployeeServiceRequest = z.infer<
  typeof registerEmployeeBodySchema
>;

interface RegisterEmployeeServiceResponse {
  employee: Employee;
}

export class RegisterEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    document,
    salary,
    startDate,
    birthDate,
    position,
    sector,
    address,
    contact,
    banks,
    files,
  }: RegisterEmployeeServiceRequest): Promise<RegisterEmployeeServiceResponse> {
    const employee = await this.employeesRepository.create({
      name,
      document,
      salary,
      startDate,
      birthDate,
      position,
      sector,
      address: { create: address },
      contact: { create: contact },
      banks: { create: banks },
      files: { create: files },
    });

    return { employee };
  }
}
