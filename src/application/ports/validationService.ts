import { User } from "../../domain/user";

export interface ValidationService {
    validateUser(user: User): void;
}
