import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterEmployeeService } from '@/services/factories/make-register-employee-service'
import { EmployeeAlreadyExistsError } from '@/services/errors/employee-already-exists'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerEmployeeBodySchema = z.object({
    name: z.string(),
    taxid_number: z.string(),
    type: z.string(),
    email: z.string().email(),
    organization_uuid: z.string(),
    salary: z.string(),
    start_date: z.coerce.date(),
    position: z.string(),
    sector: z.string(),
    address: z.object({
      zip_code: z.string(),
      public_place: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      district: z.string(),
      city: z.string(),
      federal_unit: z.string(),
      country_code: z.string()
    }),
    phone: z.object({
      telephone_number: z.string(),
      country_code: z.string()
    }),
    banks: z.array(z.object({
      bank_ispb: z.string(),
      agency: z.string(),
      account: z.string(),
      account_digit: z.string(),
      account_type: z.string(),
      key_pix: z.string().nullable().optional(),
      default: z.boolean()
    })),
    files: z.array(z.object({
      uuid: z.string(),
      type: z.string(),
      path: z.string(),
      mime_type: z.string(),
      file_name: z.string(),
      is_persistent: z.boolean().optional()
    })),
    details: z.object({
      birth_date: z.coerce.date(),
      mother_name: z.string(),
      general_registration_type: z.string(),
      general_registration_number: z.string(),
      general_registration_organ: z.string(),
      general_registration_federal_unit: z.string(),
      general_registration_emission: z.coerce.date(),
      nationality: z.string(),
      naturalness: z.string()
    })
  })

  const body = registerEmployeeBodySchema.parse(request.body)

  try {
    const registerEmployeeService = makeRegisterEmployeeService()
    await registerEmployeeService.execute(body)
  } catch (err) {
    if (err instanceof EmployeeAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}