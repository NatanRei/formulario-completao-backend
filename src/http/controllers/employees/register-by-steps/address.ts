import { makeRegisterAddressEmployeeService } from "@/factories/employee/make-register-address-employee-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { employeeAddressSchema } from "../register/schema";

export async function registerAddress(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = employeeAddressSchema.parse(request.body);

  const paramsSchema = z.object({
    uuid: z.string().uuid(),
  });

  const { uuid } = paramsSchema.parse(request.params);

  try {
    const RegisterAddressEmployeeService = makeRegisterAddressEmployeeService();
    await RegisterAddressEmployeeService.execute({
      employeeId: uuid,
      address: body,
    });

    return reply.status(204).send();
  } catch (err) {
    throw err;
  }
}
