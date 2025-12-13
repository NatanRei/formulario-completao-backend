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
    const incomingBankIds = banks?.filter((b) => b.id).map((b) => b.id!);

    const incomingFileIds = files?.filter((f) => f.id).map((f) => f.id!);

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
          deleteMany: {
            id: {
              notIn: incomingBankIds?.length ? incomingBankIds : ["__none__"],
            },
          },
          ...buildCreateUpdate(banks),
        },
      }),
      ...(files && {
        files: {
          deleteMany: {
            id: {
              notIn: incomingFileIds?.length ? incomingFileIds : ["__none__"],
            },
          },
          ...buildCreateUpdate(files),
        },
      }),
    });

    return { employee };
  }
}

function buildCreateUpdate<T extends { id?: string }>(items?: T[]) {
  if (!items?.length) return {};

  return {
    update: items
      .filter((i) => i.id)
      .map(({ id, ...data }) => ({
        where: { id },
        data,
      })),

    create: items.filter((i) => !i.id).map(({ id, ...data }) => data),
  };
}
