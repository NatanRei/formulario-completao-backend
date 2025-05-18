import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
import { all } from "./all";

export async function employeesRoutes(app: FastifyInstance) {
    app.post('/employees', register)
    app.get('/employees', all)
    app.get('/employees/:uuid', profile)
} 