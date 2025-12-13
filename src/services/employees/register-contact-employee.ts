import { employeeContactSchema } from "@/http/controllers/employees/register/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";

import { z } from "zod";

type RegisterContactEmployeeServiceRequest = {
  employeeId: string;
  contact: z.infer<typeof employeeContactSchema>;
};

export class RegisterContactEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    employeeId,
    contact,
  }: RegisterContactEmployeeServiceRequest): Promise<void> {
    await this.employeesRepository.createContact(employeeId, contact);
  }
}
