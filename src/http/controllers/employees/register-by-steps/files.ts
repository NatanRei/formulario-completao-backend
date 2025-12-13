import { makeRegisterFilesEmployeeService } from "@/factories/employee/make-register-files-employee-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { employeeFilesSchema } from "../register/schema";

export async function registerFiles(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = employeeFilesSchema.parse(request.body);

  const paramsSchema = z.object({
    uuid: z.string().uuid(),
  });

  const { uuid } = paramsSchema.parse(request.params);

  try {
    const registerFilesEmployeeService = makeRegisterFilesEmployeeService();
    await registerFilesEmployeeService.execute({
      employeeId: uuid,
      files: body,
    });

    return reply.status(204).send();
  } catch (err) {
    throw err;
  }
}
