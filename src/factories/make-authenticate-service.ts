import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "@/services/authenticate"

export function makeAuthenticateService() {
    const usersRepository = new PrismaUsersRepository()
    return new AuthenticateService(usersRepository)
}


