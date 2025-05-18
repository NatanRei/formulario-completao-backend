import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository";
import { RegisterUserService } from "../register-user";

export function makeRegisterUserService() {
    const usersRepository = new PrismaUsersRepository()
    return new RegisterUserService(usersRepository)
}