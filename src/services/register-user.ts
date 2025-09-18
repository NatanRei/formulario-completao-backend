import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { UsersRepository } from "@/http/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface RegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserServiceResponse {
  user: User;
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return {
      user,
    };
  }
}
