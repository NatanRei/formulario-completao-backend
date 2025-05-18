import { Employee } from "@prisma/client"
import { EmployeesRepository } from "@/http/repositories/employees-repository"

interface RegisterEmployeeServiceRequest {
  name: string
  taxid_number: string
  type: string
  email: string
  organization_uuid: string
  salary: string
  start_date: Date
  position: string
  sector: string
  address: {
    zip_code: string
    public_place: string
    number: string
    complement?: string
    district: string
    city: string
    federal_unit: string
    country_code: string
  }
  phone: {
    telephone_number: string
    country_code: string
  }
  banks: {
    bank_ispb: string
    agency: string
    account: string
    account_digit: string
    account_type: string
    key_pix?: string | null
    default: boolean
  }[]
  files: {
    uuid: string
    type: string
    path: string
    mime_type: string
    file_name: string
    is_persistent?: boolean
  }[]
  details: {
    birth_date: Date
    mother_name: string
    general_registration_type: string
    general_registration_number: string
    general_registration_organ: string
    general_registration_federal_unit: string
    general_registration_emission: Date
    nationality: string
    naturalness: string
  }
}

interface RegisterEmployeeServiceResponse {
  employee: Employee
}

export class RegisterEmployeeService {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    taxid_number,
    type,
    email,
    organization_uuid,
    salary,
    start_date,
    position,
    sector,
    address,
    phone,
    banks,
    files,
    details
  }: RegisterEmployeeServiceRequest): Promise<RegisterEmployeeServiceResponse> {
      
    const employee = await this.employeesRepository.create({
      name,
      taxid_number,
      type,
      email,
      organization_uuid,
      salary,
      start_date,
      position,
      sector,
      address: { create: address },
      phone: { create: phone },
      banks: { create: banks },
      files: { create: files },
      details: { create: details },
    })

    return { employee }
  }
}
