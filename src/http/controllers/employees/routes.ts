import { FastifyInstance } from "fastify";
import { register } from "./register";
import { profile } from "./profile";
import { all } from "./all";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function employeesRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/employees', register)
    app.get('/employees', all)
    app.get('/employees/:uuid', profile)
} 