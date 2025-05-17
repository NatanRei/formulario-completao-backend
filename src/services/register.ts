import { hash } from "bcryptjs"
import { User } from "@prisma/client"

import { UserAlreadyExistsError } from "./errors/user-already-exists"
import { UsersRepository } from "@/http/repositories/users-repository"

interface RegisterServiceRequest {
    name: string
    email: string
    password: string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    constructor (private usersRepository: UsersRepository){}

    async execute({ email, name, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
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