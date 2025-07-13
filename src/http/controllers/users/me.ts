
import { FastifyReply, FastifyRequest } from "fastify";

export async function me(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return { user: request.user };
}
