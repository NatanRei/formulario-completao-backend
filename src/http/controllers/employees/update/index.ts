import { EmployeeAlreadyExistsError } from "@/errors/employee-already-exists";
import { FastifyReply, FastifyRequest } from "fastify";
import { updateEmployeeBodySchema } from "./schema";
import { makeUpdateEmployeeService } from "@/factories/make-update-employee-service";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const body = updateEmployeeBodySchema.parse(request.body);

  try {
    const updateEmployeeService = makeUpdateEmployeeService();
    await updateEmployeeService.execute(body);
  } catch (err) {
    if (err instanceof EmployeeAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(204).send();
}
