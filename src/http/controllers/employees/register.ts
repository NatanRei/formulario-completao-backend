import { EmployeeAlreadyExistsError } from "@/services/errors/employee-already-exists";
import { makeRegisterEmployeeService } from "@/services/factories/make-register-employee-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerEmployeeBodySchema = z.object({
    name: z.string(),
    document: z.string(),
    salary: z.string(),
    startDate: z.coerce.date(),
    birthDate: z.coerce.date(),
    position: z.string(),
    sector: z.string(),
    address: z.object({
      zipCode: z.string(),
      publicPlace: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
      countryCode: z.string(),
    }),
    contact: z.object({
      email: z.string().email(),
      telephoneNumber: z.string(),
      countryCode: z.string(),
    }),
    banks: z.array(
      z.object({
        bankCode: z.string(),
        agency: z.string(),
        account: z.string(),
        accountDigit: z.string(),
        accountType: z.string(),
        keyPix: z.string().nullable().optional(),
        default: z.boolean(),
      })
    ),
    files: z.array(
      z.object({
        type: z.string(),
        path: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
        is_persistent: z.boolean().optional(),
      })
    ),
  });

  const body = registerEmployeeBodySchema.parse(request.body);

  try {
    const registerEmployeeService = makeRegisterEmployeeService();
    await registerEmployeeService.execute(body);
  } catch (err) {
    if (err instanceof EmployeeAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
