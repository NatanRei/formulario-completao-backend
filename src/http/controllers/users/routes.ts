import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { logout } from "./logout";
import { register } from "./register";
import { me } from "./me";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  app.post("/logout", { preHandler: [app.authenticate] }, logout);

  app.get("/me", { preHandler: [app.authenticate] }, me);
}
