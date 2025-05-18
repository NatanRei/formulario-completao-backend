import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";

export async function employeesRoutes(app: FastifyInstance) {
    app.post('/employees', register)
    app.get('/employees/:uuid', profile)
} 