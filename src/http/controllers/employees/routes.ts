import { FastifyInstance } from "fastify";
import { all } from "./all";
import { profile } from "./profile";
import { register } from "./register";
import { registerAddress } from "./register-by-steps/address";
import { registerBanks } from "./register-by-steps/banks";
import { registerBase } from "./register-by-steps/base";
import { registerContact } from "./register-by-steps/contact";
import { registerFiles } from "./register-by-steps/files";
import { update } from "./update";

export async function employeesRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.post("", register);
  app.put("/:uuid", update);
  app.post("/base", registerBase);
  app.post("/:uuid/address", registerAddress);
  app.post("/:uuid/contact", registerContact);
  app.post("/:uuid/banks", registerBanks);
  app.post("/:uuid/files", registerFiles);
  app.get("", all);
  app.get("/:uuid", profile);
}
