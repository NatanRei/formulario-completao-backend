import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt, { FastifyJWT } from '@fastify/jwt'

import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'

import { usersRoutes } from './http/controllers/users/routes'
import { employeesRoutes } from './http/controllers/employees/routes'

export const app = fastify()

app.register(cors, {
  origin: [env.CORS_ALLOWED_ORIGIN, 'http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.decorate(
  "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;

    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
      }
    
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
);

app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
  hook: "preHandler",
});

app.register(usersRoutes)
app.register(employeesRoutes, {prefix: '/employees'})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format()})
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.'})
})