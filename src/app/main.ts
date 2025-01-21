import { CreateUserUseCase } from "../application/use-cases/createUser";
import { UserRepositoryDynamoImpl } from "../infrastructre/adapters/userRepositoryDynamoImp";
import { ValidationServiceImpl } from "../infrastructre/adapters/validationServiceImpl";
import { userHandler } from "../interface-adapters/handlers/userHandler";

const userRepository = new UserRepositoryDynamoImpl();
const validationService = new ValidationServiceImpl();

const createUserUseCase = new CreateUserUseCase(userRepository, validationService);

export const handler = userHandler(createUserUseCase);
