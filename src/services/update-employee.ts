import { updateEmployeeBodySchema } from "@/http/controllers/employees/update/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";
import { Employee } from "@prisma/client";
import { z } from "zod";

type UpdateEmployeeServiceRequest = z.infer<typeof updateEmployeeBodySchema>;

interface UpdateEmployeeServiceResponse {
  employee: Employee;
}

export class UpdateEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    id,
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
  }: UpdateEmployeeServiceRequest): Promise<UpdateEmployeeServiceResponse> {
    const employee = await this.employeesRepository.update(id as string, {
      name,
      document,
      salary,
      startDate,
      birthDate,
      position,
      sector,
      ...(address && { address: { update: address } }),
      ...(contact && { contact: { update: contact } }),
      ...(banks && {
        banks: {
          update: banks.map((b) => ({ where: { id: b.id }, data: b })),
        },
      }),
      ...(files && {
        files: {
          update: files.map((f) => ({ where: { id: f.id }, data: f })),
        },
      }),
    });

    return { employee };
  }
}
