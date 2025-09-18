import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { EmployeesRepository } from "../employees-repository";

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string) {
    return await prisma.employee.findUnique({
      where: { id },
      include: {
        address: true,
        contact: true,
        banks: true,
        files: true,
      },
    });
  }

  async getAll() {
    return await prisma.employee.findMany();
  }

  async create(data: Prisma.EmployeeCreateInput) {
    return await prisma.employee.create({
      data,
      include: {
        address: true,
        contact: true,
        banks: true,
        files: true,
      },
    });
  }
}
