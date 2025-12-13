import { makeRegisterContactEmployeeService } from "@/factories/employee/make-register-contact-employee-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { employeeContactSchema } from "../register/schema";

export async function registerContact(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = employeeContactSchema.parse(request.body);

  const paramsSchema = z.object({
    uuid: z.string().uuid(),
  });

  const { uuid } = paramsSchema.parse(request.params);

  try {
    const registerContactEmployeeService = makeRegisterContactEmployeeService();
    await registerContactEmployeeService.execute({
      employeeId: uuid,
      contact: body,
    });

    return reply.status(204).send();
  } catch (err) {
    throw err;
  }
}
