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

  async update(id: string, data: Prisma.EmployeeUpdateInput) {
    return await prisma.employee.update({
      where: { id },
      data,
      include: {
        address: true,
        contact: true,
        banks: true,
        files: true,
      },
    });
  }

  async createBase(data: Prisma.EmployeeCreateInput) {
    return await prisma.employee.create({
      data,
    });
  }

  async createAddress(employeeId: string, data: Prisma.AddressCreateInput) {
    const addressCreated = await prisma.address.create({
      data,
    });

    await prisma.employee.update({
      where: { id: employeeId },
      data: { addressId: addressCreated.id },
    });
  }

  async createContact(employeeId: string, data: Prisma.ContactCreateInput) {
    const contactCreated = await prisma.contact.create({
      data,
    });

    await prisma.employee.update({
      where: { id: employeeId },
      data: { contactId: contactCreated.id },
    });
  }

  async createBanks(data: Prisma.BankCreateManyArgs) {
    await prisma.bank.createMany(data);
  }

  async createFiles(data: Prisma.FileCreateManyArgs) {
    await prisma.file.createMany(data);
  }
}
