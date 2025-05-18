import { makeGetEmployeesService } from '@/services/factories/make-get-employees-service'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function all( request: FastifyRequest, reply: FastifyReply ) {
    const getEmployees = makeGetEmployeesService()

    const { employees } = await getEmployees.execute()

    return reply.status(200).send(
        { 
            employees
        }
    )
}