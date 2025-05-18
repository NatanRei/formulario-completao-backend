import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { EmployeesRepository } from "../employees-repository";

export class PrismaEmployeesRepository implements EmployeesRepository {
  async findById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        address: true,
        phone: true,
        details: true,
        banks: true,
        files: true,
      },
    });
    return employee;
  }

  async create(data: Prisma.EmployeeCreateInput) {
    const employee = await prisma.employee.create({
      data,
      include: {
        address: true,
        phone: true,
        details: true,
        banks: true,
        files: true,
      },
    });
    return employee;
  }
}
