import { employeeFilesSchema } from "@/http/controllers/employees/register/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";

import { z } from "zod";

type RegisterFilesEmployeeServiceRequest = {
  employeeId: string;
  files: z.infer<typeof employeeFilesSchema>;
};

export class RegisterFilesEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    employeeId,
    files,
  }: RegisterFilesEmployeeServiceRequest): Promise<void> {
    await this.employeesRepository.createFiles({
      data: files.map((file) => ({
        ...file,
        employeeId,
      })),
    });
  }
}
