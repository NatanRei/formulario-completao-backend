import { EmployeeAlreadyExistsError } from "@/errors/employee-already-exists";
import { makeRegisterBaseEmployeeService } from "@/factories/employee/make-register-base-employee-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { employeeBaseSchema } from "../register/schema";

export async function registerBase(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = employeeBaseSchema.parse(request.body);

  try {
    const registerBaseEmployeeService = makeRegisterBaseEmployeeService();
    const res = await registerBaseEmployeeService.execute(body);

    return reply.status(201).send({ id: res.employee.id });
  } catch (err) {
    if (err instanceof EmployeeAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
}
