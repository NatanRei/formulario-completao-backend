import { makeRegisterContactEmployeeService } from "@/factories/employee/make-register-contact-employee-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { employeeBanksSchema } from "../register/schema";
import { makeRegisterBanksEmployeeService } from "@/factories/employee/make-register-banks-employee-service";

export async function registerBanks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = employeeBanksSchema.parse(request.body);

  const paramsSchema = z.object({
    uuid: z.string().uuid(),
  });

  const { uuid } = paramsSchema.parse(request.params);

  try {
    const registerBanksEmployeeService = makeRegisterBanksEmployeeService();
    await registerBanksEmployeeService.execute({
      employeeId: uuid,
      banks: body,
    });

    return reply.status(204).send();
  } catch (err) {
    throw err;
  }
}
