import { employeeBanksSchema } from "@/http/controllers/employees/register/schema";
import { EmployeesRepository } from "@/http/repositories/employees-repository";

import { z } from "zod";

type RegisterBanksEmployeeServiceRequest = {
  employeeId: string;
  banks: z.infer<typeof employeeBanksSchema>;
};

export class RegisterBanksEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    employeeId,
    banks,
  }: RegisterBanksEmployeeServiceRequest): Promise<void> {
    await this.employeesRepository.createBanks({
      data: banks.map((bank) => ({
        ...bank,
        employeeId,
      })),
    });
  }
}
