import { hash } from "bcryptjs"
import { User } from "@prisma/client"

import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { UsersRepository } from "@/http/repositories/users-repository"

interface RegisterUserServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterUserServiceResponse {
    user: User
}

export class RegisterUserService {
    constructor (private usersRepository: UsersRepository){}

    async execute({ email, name, password }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const password_hash = await hash(password, 6)

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user
        }
    }
}