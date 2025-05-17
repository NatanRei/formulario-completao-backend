import { PrismaUsersRepository } from "@/http/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../register";

export function makeRegisterService() {
    const usersRepository = new PrismaUsersRepository()
    return new RegisterService(usersRepository)
}