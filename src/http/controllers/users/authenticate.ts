import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate( request: FastifyRequest, reply: FastifyReply ) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(request.body)
    
    try {
        const authenticateUseCase = makeAuthenticateService()
        const { user } = await authenticateUseCase.execute({
            email, password
        })

        const token = await reply.jwtSign(
            {}, 
            {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await reply.jwtSign(
        {},  
        {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        })

        return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .status(200).send({
            token
        })

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ 'message': err.message })
        }
        throw err
    }



    
}