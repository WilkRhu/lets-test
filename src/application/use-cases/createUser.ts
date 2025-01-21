import { User } from "../../domain/user";
import { UserRepository } from "../ports/userRepository";
import { ValidationService } from "../ports/validationService";


export class CreateUserUseCase {
    private userRepository: UserRepository;
    private validationService: ValidationService;

    constructor(userRepository: UserRepository, validationService: ValidationService) {
        this.userRepository = userRepository;
        this.validationService = validationService;
    }

    async execute(user: User): Promise<void> {
        this.validationService.validateUser(user);
        await this.userRepository.saveUser(user);
    }
}
