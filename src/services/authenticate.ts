import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";
import { UsersRepository } from "@/http/repositories/users-repository";

interface AuthenticateServiceRequest {
    email: string
    password: string
}

interface AuthenticateServiceResponse {
    user: User
}

export class AuthenticateService {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}