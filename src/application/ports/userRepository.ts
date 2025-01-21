import { User } from "../../domain/user";

export interface UserRepository {
    saveUser(user: User): Promise<void>;
    getUserById(userId: string): Promise<User | null>;
}
