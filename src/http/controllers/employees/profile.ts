import { makeGetEmployeeProfileService } from '@/services/factories/make-get-employee-profile-service'
import { FastifyRequest, FastifyReply } from 'fastify'
import * as z from 'zod'

export async function profile( request: FastifyRequest, reply: FastifyReply ) {
    const getEmployeeProfile = makeGetEmployeeProfileService()

    const paramsSchema = z.object({
        uuid: z.string().uuid()
    })

    const { uuid } = paramsSchema.parse(request.params)

    const { employee } = await getEmployeeProfile.execute({
        employeeId: uuid
    })

    return reply.status(200).send(
        { 
            employee: {
                ...employee,
            } 
        }
    )
}