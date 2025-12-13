import { EmployeeAlreadyExistsError } from "@/errors/employee-already-exists";
import { FastifyReply, FastifyRequest } from "fastify";
import { registerEmployeeBodySchema } from "./schema";
import { makeRegisterEmployeeService } from "@/factories/make-register-employee-service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
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
