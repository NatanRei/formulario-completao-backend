import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
import { all } from "./all";

export async function employeesRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.authenticate);

    app.post('', register)
    app.get('', all)
    app.get('/:uuid', profile)
} 