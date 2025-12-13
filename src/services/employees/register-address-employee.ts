import { employeeAddressSchema } from "@/http/controllers/employees/register/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";

import { z } from "zod";

type RegisterAddressEmployeeServiceRequest = {
  employeeId: string;
  address: z.infer<typeof employeeAddressSchema>;
};

export class RegisterAddressEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    employeeId,
    address,
  }: RegisterAddressEmployeeServiceRequest): Promise<void> {
    await this.employeesRepository.createAddress(
      employeeId,
      address
    );
  }
}
