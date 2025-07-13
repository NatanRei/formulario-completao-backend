import { FastifyReply, FastifyRequest } from "fastify";


export async function logout(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie("access_token", {path: '/'});

  return reply.status(200).send({ message: "Logout realizado." });
}
