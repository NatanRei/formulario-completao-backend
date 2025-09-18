import { EmployeesRepository } from "@/http/repositories/employees-repository";
import { Employee } from "@prisma/client";

interface RegisterEmployeeServiceRequest {
  name: string;
  document: string;
  salary: string;
  startDate: Date;
  birthDate: Date;
  position: string;
  sector: string;
  address: {
    zipCode: string;
    publicPlace: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    countryCode: string;
  };
  contact: {
    email: string;
    telephoneNumber: string;
    countryCode: string;
  };
  banks: {
    bankCode: string;
    agency: string;
    account: string;
    accountDigit: string;
    accountType: string;
    keyPix?: string | null;
    default: boolean;
  }[];
  files: {
    type: string;
    path: string;
    mimeType: string;
    fileName: string;
    is_persistent?: boolean;
  }[];
}

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
